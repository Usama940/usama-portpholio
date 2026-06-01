import path from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { transform } from "esbuild";

const ASSET_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg|pdf)$/i;

/**
 * Browser-only modules that cannot run in Node.js during prerender.
 * We stub them out so renderToString can complete without errors.
 * These stubs are only used during the prerender pipeline — never in the browser.
 */
const BROWSER_ONLY_STUBS = {
  // file-saver: CJS module, named export doesn't work in Node ESM
  'file-saver': `export function saveAs() {} export default { saveAs: function() {} };`,

  // pdfjs-dist: accesses window/document/canvas on import
  'pdfjs-dist/build/pdf.mjs': `
    export const GlobalWorkerOptions = {};
    export function getDocument() { return { promise: Promise.resolve({ numPages: 0, getPage: () => Promise.resolve({ getViewport: () => ({ width: 0, height: 0 }), render: () => ({ promise: Promise.resolve() }) }) }) }; }
    export default {};
  `,

  // qrcode: may access canvas in some environments
  'qrcode': `
    export function toDataURL() { return Promise.resolve(''); }
    export function toCanvas() { return Promise.resolve(); }
    export default { toDataURL: () => Promise.resolve(''), toCanvas: () => Promise.resolve() };
  `,
};

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

export async function resolve(specifier, context, defaultResolve) {
  // Intercept browser-only modules before Node tries to load them
  if (BROWSER_ONLY_STUBS[specifier]) {
    return { url: `node:stub:${specifier}`, shortCircuit: true };
  }
  return defaultResolve(specifier, context, defaultResolve);
}

export async function load(url, context, defaultLoad) {
  // Return stub source for browser-only modules
  const stubKey = url.startsWith('node:stub:') ? url.slice('node:stub:'.length) : null;
  if (stubKey && BROWSER_ONLY_STUBS[stubKey]) {
    return {
      format: 'module',
      source: BROWSER_ONLY_STUBS[stubKey],
      shortCircuit: true,
    };
  }

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
