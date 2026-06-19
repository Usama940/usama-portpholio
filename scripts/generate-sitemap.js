import fs from "fs/promises";
import { SITE, PAGES } from "../src/seo/meta.js";
import { TOOLS } from "../src/data/tools.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeXml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function generate() {
  const today = new Date().toISOString().slice(0, 10);

  const urls = [
    ...Object.values(PAGES).map((page) => ({
      loc: `${SITE.domain}${page.path}`,
      lastmod: today,
      changefreq: "weekly",
      priority: page.path === "/" ? "1.00" : "0.80",
      image: `${SITE.domain}${(page.image || SITE.defaultImage).replace(
        ".svg",
        ".png"
      )}`,
      title: page.title,
    })),

    {
      loc: `${SITE.domain}/tools`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.85",
      image: `${SITE.domain}/og/tools.png`,
      title: "Free Browser Tools — PDF, Image, QR Code & More | Usama Aslam",
    },

    {
      loc: `${SITE.domain}/tools/pdf-tools`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.82",
      image: `${SITE.domain}/og/pdf-tools.png`,
      title: "Free Online PDF Tools — Compress, Merge, Split & Convert",
    },

    {
      loc: `${SITE.domain}/tools/image-tools`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.82",
      image: `${SITE.domain}/og/image-tools.png`,
      title: "Free Online Image Tools — Compress & Resize Images",
    },

    {
      loc: `${SITE.domain}/tools/text-tools`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.82",
      image: `${SITE.domain}/og/text-tools.png`,
      title: "Free Online Text Tools — JSON Formatter & Text Utilities",
    },

    {
      loc: `${SITE.domain}/tools/dev-tools`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.82",
      image: `${SITE.domain}/og/dev-tools.png`,
      title: "Free Developer Tools — QR Code & Password Generator",
    },

    ...TOOLS.map((tool) => ({
      loc: `${SITE.domain}/tools/${tool.slug}`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.75",
      image: `${SITE.domain}/og/${tool.slug}.png`,
      title: `${tool.name} — Free Online Tool | Usama Aslam`,
    })),
  ];

  // Remove duplicate URLs
  const uniqueUrls = [
    ...new Map(urls.map((item) => [item.loc, item])).values(),
  ];

  const items = uniqueUrls
    .map(
      (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <image:image>
      <image:loc>${escapeXml(u.image)}</image:loc>
      <image:title>${escapeXml(u.title)}</image:title>
    </image:image>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${items}
</urlset>`;

  const outPath = path.resolve(__dirname, "..", "public", "sitemap.xml");

  console.log("Writing sitemap to:", outPath);

  await fs.writeFile(outPath, xml, "utf8");

  console.log(
    `Sitemap generated successfully with ${uniqueUrls.length} URLs`
  );
}

generate().catch((err) => {
  console.error("Sitemap generation failed:");
  console.error(err);
  process.exit(1);
});