import fs from "fs/promises";
import { SITE, PAGES } from "../src/seo/meta.js";
import path from "path";

async function generate() {
  const urls = Object.values(PAGES).map((p) => ({ loc: SITE.domain + p.path, lastmod: new Date().toISOString().slice(0, 10), priority: p.path === "/" ? "1.00" : "0.80" }));
  const items = urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <priority>${u.priority}</priority>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;
  const outPath = path.resolve(process.cwd(), "public", "sitemap.xml");
  await fs.writeFile(outPath, xml, "utf8");
  console.log("Sitemap written to", outPath);
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
