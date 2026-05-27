import fs from "fs/promises";
import path from "path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { routes } from "../src/router.js";

const ROUTES = ["/", "/about", "/projects", "/contact"];
const DIST_DIR = path.join(process.cwd(), "dist");
const INDEX_PATH = path.join(DIST_DIR, "index.html");

const SEO_TAG_REGEXES = [
  /<title>.*?<\/title>/gis,
  /<meta\s+name="description"[^>]*>/gis,
  /<meta\s+name="keywords"[^>]*>/gis,
  /<link\s+rel="canonical"[^>]*>/gis,
  /<meta\s+property="og:[^"]+"[^>]*>/gis,
  /<meta\s+name="twitter:[^"]+"[^>]*>/gis,
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gis,
];

function routeToOutputPath(route) {
  if (route === "/") {
    return INDEX_PATH;
  }

  return path.join(DIST_DIR, route.replace(/^\//, ""), "index.html");
}

function stripExistingSeo(html) {
  return SEO_TAG_REGEXES.reduce((output, regex) => output.replace(regex, ""), html);
}

async function renderRoute(route, baseTemplate) {
  const helmetContext = {};
  const router = createMemoryRouter(routes, {
    initialEntries: [route],
  });

  const appMarkup = renderToStaticMarkup(
    React.createElement(
      HelmetProvider,
      { context: helmetContext },
      React.createElement(RouterProvider, { router }),
    ),
  );

  const helmet = helmetContext.helmet;
  const headTags = [
    helmet?.title?.toString(),
    helmet?.meta?.toString(),
    helmet?.link?.toString(),
    helmet?.script?.toString(),
  ]
    .filter(Boolean)
    .join("\n");

  let html = baseTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${appMarkup}</div>`,
  );

  html = stripExistingSeo(html);
  html = html.replace("</head>", `${headTags}\n</head>`);

  const outputPath = routeToOutputPath(route);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html, "utf8");

  console.log(`Prerendered ${route} -> ${path.relative(process.cwd(), outputPath)}`);
}

async function main() {
  const baseTemplate = await fs.readFile(INDEX_PATH, "utf8");

  for (const route of ROUTES) {
    await renderRoute(route, baseTemplate);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
