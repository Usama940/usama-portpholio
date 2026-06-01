import fs from "fs/promises";
import { SITE, PAGES } from "../src/seo/meta.js";
import { TOOLS } from "../src/data/tools.js";
import path from "path";

async function generate() {
  const urls = [
    ...Object.values(PAGES).map((page) => ({
      loc: `${SITE.domain}${page.path}`,
      lastmod: new Date().toISOString().slice(0, 10),
      priority: page.path === '/' ? '1.00' : '0.80',
      image: `${SITE.domain}${(page.image || SITE.defaultImage).replace('.svg', '.png')}`,
      title: page.title,
    })),
    {
      loc: `${SITE.domain}/tools`,
      lastmod: new Date().toISOString().slice(0, 10),
      priority: '0.85',
      image: `${SITE.domain}/og/tools.png`,
      title: 'Free Browser Tools — PDF, Image, QR Code & More | Usama Aslam',
    },
    // Category hub pages
    {
      loc: `${SITE.domain}/tools/pdf-tools`,
      lastmod: new Date().toISOString().slice(0, 10),
      priority: '0.82',
      image: `${SITE.domain}/og/pdf-tools.png`,
      title: 'Free Online PDF Tools — Compress, Merge, Split & Convert',
    },
    {
      loc: `${SITE.domain}/tools/image-tools`,
      lastmod: new Date().toISOString().slice(0, 10),
      priority: '0.82',
      image: `${SITE.domain}/og/image-tools.png`,
      title: 'Free Online Image Tools — Compress & Resize Images',
    },
    {
      loc: `${SITE.domain}/tools/text-tools`,
      lastmod: new Date().toISOString().slice(0, 10),
      priority: '0.82',
      image: `${SITE.domain}/og/text-tools.png`,
      title: 'Free Online Text Tools — JSON Formatter & Text Utilities',
    },
    {
      loc: `${SITE.domain}/tools/dev-tools`,
      lastmod: new Date().toISOString().slice(0, 10),
      priority: '0.82',
      image: `${SITE.domain}/og/dev-tools.png`,
      title: 'Free Developer Tools — QR Code & Password Generator',
    },
    // Individual tool pages
    ...TOOLS.map((tool) => ({
      loc: `${SITE.domain}/tools/${tool.slug}`,
      lastmod: new Date().toISOString().slice(0, 10),
      priority: '0.75',
      image: `${SITE.domain}/og/${tool.slug}.png`,
      title: `${tool.name} — Free Online Tool | Usama Aslam`,
    })),
  ];

  const items = urls
    .map(
      (u) => `  <url>\n    <loc>${u.loc}</loc>\n    <priority>${u.priority}</priority>\n    <lastmod>${u.lastmod}</lastmod>\n    <image:image>\n      <image:loc>${u.image}</image:loc>\n      <image:title>${u.title}</image:title>\n    </image:image>\n  </url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${items}\n</urlset>`;
  const outPath = path.resolve(process.cwd(), "public", "sitemap.xml");
  await fs.writeFile(outPath, xml, "utf8");
  console.log("Sitemap written to", outPath);
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
