import path from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { transform } from "esbuild";

const ASSET_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg|pdf)$/i;
let manifestCache;

async function getManifest() {
  if (manifestCache) {
    return manifestCache;
  }

  const manifestPaths = [
    path.join(process.cwd(), "dist", ".vite", "manifest.json"),
    path.join(process.cwd(), "dist", "manifest.json"),
  ];

  for (const manifestPath of manifestPaths) {
    try {
      const manifestText = await readFile(manifestPath, "utf8");
      manifestCache = JSON.parse(manifestText);
      return manifestCache;
    } catch {
      continue;
    }
  }

  manifestCache = {};
  return manifestCache;
}

export async function load(url, context, defaultLoad) {
  if (url.endsWith(".jsx")) {
    const source = await readFile(new URL(url), "utf8");
    const result = await transform(source, {
      loader: "jsx",
      format: "esm",
      jsx: "automatic",
      sourcemap: "inline",
      sourcefile: url,
      target: "node22",
    });

    return {
      format: "module",
      source: result.code,
      shortCircuit: true,
    };
  }

  if (ASSET_EXTENSIONS.test(url)) {
    const filePath = fileURLToPath(url);
    const relativeKey = path
      .relative(process.cwd(), filePath)
      .replace(/\\/g, "/");

    const manifest = await getManifest();
    const manifestEntry = manifest[relativeKey];
    const publicPath = manifestEntry ? `/${manifestEntry.file}` : `/${relativeKey}`;

    return {
      format: "module",
      source: `export default ${JSON.stringify(publicPath)};`,
      shortCircuit: true,
    };
  }

  return defaultLoad(url, context, defaultLoad);
}
