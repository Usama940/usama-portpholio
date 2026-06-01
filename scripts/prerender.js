/**
 * prerender.js — Production static prerender pipeline
 *
 * APPROACH:
 * We bypass react-helmet-async entirely for metadata injection.
 * Instead, we build metadata directly from the SEO data sources
 * (meta.js, tools.js, toolsSeo.js) and inject it into the HTML template.
 *
 * Page content (HTML body) is rendered via renderToString + StaticRouter.
 * This gives us:
 *   1. Full HTML content for Googlebot
 *   2. Correct per-route metadata (title, description, canonical, OG, JSON-LD)
 *   3. No dependency on Helmet SSR context (which breaks in Node ESM)
 */

import fs from 'fs/promises';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';

// ─── SEO data sources ─────────────────────────────────────────────────────────
import { PAGES, SITE_URL as META_SITE_URL } from '../src/seo/meta.js';
import { TOOL_PAGE_CONTENT } from '../src/data/tools.js';
import { buildToolSeo } from '../src/seo/tools/toolsSeo.js';
import { personSchema, webSiteSchema, aboutPageSchema, contactPageSchema, projectListSchema } from '../src/seo/schemas.js';

// ─── Page components (direct imports — no React.lazy) ─────────────────────────
import Home from '../src/pages/Home.jsx';
import About from '../src/pages/About.jsx';
import Contact from '../src/pages/Contact.jsx';
import Project from '../src/pages/Project.jsx';
import Privacy from '../src/pages/Privacy.jsx';
import Terms from '../src/pages/Terms.jsx';
import ToolsLayout from '../src/pages/tools/ToolsLayout.jsx';
import ToolsHome from '../src/pages/tools/ToolsHome.jsx';
import PdfToolsHub from '../src/pages/tools/PdfToolsHub.jsx';
import ImageToolsHub from '../src/pages/tools/ImageToolsHub.jsx';
import TextToolsHub from '../src/pages/tools/TextToolsHub.jsx';
import DevToolsHub from '../src/pages/tools/DevToolsHub.jsx';
import ImageToPdf from '../src/pages/tools/ImageToPdf.jsx';
import PdfCompressor from '../src/pages/tools/PdfCompressor.jsx';
import PdfMerger from '../src/pages/tools/PdfMerger.jsx';
import PdfSplitter from '../src/pages/tools/PdfSplitter.jsx';
import WordToPdf from '../src/pages/tools/WordToPdf.jsx';
import ImageCompressor from '../src/pages/tools/ImageCompressor.jsx';
import ImageResizer from '../src/pages/tools/ImageResizer.jsx';
import QrCodeGenerator from '../src/pages/tools/QrCodeGenerator.jsx';
import JsonFormatter from '../src/pages/tools/JsonFormatter.jsx';
import PasswordGenerator from '../src/pages/tools/PasswordGenerator.jsx';

const SITE_URL = 'https://usama-resumae.netlify.app';

// ─── Build metadata for each route independently of Helmet ───────────────────
function buildMeta(route) {
  // Portfolio pages
  if (route === '/') {
    return {
      title: PAGES.home.title,
      description: PAGES.home.description,
      canonical: `${SITE_URL}/`,
      image: `${SITE_URL}/og/home.png`,
      robots: 'index, follow',
      jsonLd: [personSchema(), webSiteSchema()],
    };
  }
  if (route === '/about') {
    return {
      title: PAGES.about.title,
      description: PAGES.about.description,
      canonical: `${SITE_URL}/about`,
      image: `${SITE_URL}/og/about.png`,
      robots: 'index, follow',
      jsonLd: [aboutPageSchema({ title: PAGES.about.title, description: PAGES.about.description })],
    };
  }
  if (route === '/projects') {
    return {
      title: PAGES.projects.title,
      description: PAGES.projects.description,
      canonical: `${SITE_URL}/projects`,
      image: `${SITE_URL}/og/projects.png`,
      robots: 'index, follow',
      jsonLd: [projectListSchema([{ name: 'Weather App' }, { name: 'iResonate' }, { name: 'Portfolio Platform' }, { name: 'Full Stack Dashboard' }])],
    };
  }
  if (route === '/contact') {
    return {
      title: PAGES.contact.title,
      description: PAGES.contact.description,
      canonical: `${SITE_URL}/contact`,
      image: `${SITE_URL}/og/contact.png`,
      robots: 'index, follow',
      jsonLd: [contactPageSchema({ title: PAGES.contact.title })],
    };
  }
  if (route === '/privacy') {
    return {
      title: 'Privacy Policy — Usama Aslam Portfolio & Tools',
      description: "Privacy policy for Usama Aslam's portfolio and free browser-based tools.",
      canonical: `${SITE_URL}/privacy`,
      image: `${SITE_URL}/og/home.png`,
      robots: 'noindex, follow',
      jsonLd: [],
    };
  }
  if (route === '/terms') {
    return {
      title: 'Terms of Service — Usama Aslam Portfolio & Tools',
      description: "Terms of service for Usama Aslam's free browser-based tools.",
      canonical: `${SITE_URL}/terms`,
      image: `${SITE_URL}/og/home.png`,
      robots: 'noindex, follow',
      jsonLd: [],
    };
  }

  // Tools hub pages
  const hubMeta = {
    '/tools': {
      title: 'Free Browser Tools — PDF, Image, QR Code & More | Usama Aslam',
      description: 'Free browser-based tools by Usama Aslam: compress PDFs, convert images, generate QR codes, format JSON, and create strong passwords.',
      image: `${SITE_URL}/og/tools.png`,
    },
    '/tools/pdf-tools': {
      title: 'Free Online PDF Tools — Compress, Merge, Split & Convert | Usama Aslam',
      description: 'Free browser-based PDF tools: compress PDF, merge PDFs, split PDF pages, convert images to PDF, and convert Word to PDF.',
      image: `${SITE_URL}/og/pdf-tools.png`,
    },
    '/tools/image-tools': {
      title: 'Free Online Image Tools — Compress & Resize Images | Usama Aslam',
      description: 'Free browser-based image tools: compress images to reduce file size and resize images to exact pixel dimensions.',
      image: `${SITE_URL}/og/image-tools.png`,
    },
    '/tools/text-tools': {
      title: 'Free Online Text Tools — JSON Formatter & Text Utilities | Usama Aslam',
      description: 'Free browser-based text tools: format and validate JSON, prettify code output.',
      image: `${SITE_URL}/og/text-tools.png`,
    },
    '/tools/dev-tools': {
      title: 'Free Developer & Productivity Tools — QR Code & Password Generator | Usama Aslam',
      description: 'Free browser-based developer tools: generate QR codes and strong passwords.',
      image: `${SITE_URL}/og/dev-tools.png`,
    },
  };

  if (hubMeta[route]) {
    const h = hubMeta[route];
    return {
      title: h.title,
      description: h.description,
      canonical: `${SITE_URL}${route}`,
      image: h.image,
      robots: 'index, follow',
      jsonLd: [],
    };
  }

  // Individual tool pages
  const toolId = route.replace('/tools/', '');
  const toolContent = TOOL_PAGE_CONTENT[toolId];
  if (toolContent) {
    const seo = buildToolSeo({
      title: toolContent.title,
      description: toolContent.metaDescription || toolContent.description,
      path: route,
      toolName: toolContent.h1 || toolContent.title,
      featureList: toolContent.features || [],
      howToSteps: toolContent.howTo || [],
      faq: toolContent.faq || [],
      breadcrumbs: [
        { name: 'Home', url: SITE_URL },
        { name: 'Tools', url: `${SITE_URL}/tools` },
        { name: toolContent.title, url: `${SITE_URL}${route}` },
      ],
      image: `${SITE_URL}/og/${toolId}.png`,
    });
    return {
      title: seo.title,
      description: seo.description,
      canonical: seo.canonical,
      image: seo.image,
      robots: 'index, follow',
      jsonLd: seo.jsonLd,
    };
  }

  return {
    title: 'Usama Aslam — Full Stack Developer',
    description: 'Portfolio and free browser-based tools by Usama Aslam.',
    canonical: `${SITE_URL}${route}`,
    image: `${SITE_URL}/og/home.png`,
    robots: 'index, follow',
    jsonLd: [],
  };
}

// ─── Build <head> tags string from metadata ───────────────────────────────────
function buildHeadTags(meta) {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const lines = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${esc(meta.canonical)}" />`,
    `<meta name="robots" content="${esc(meta.robots)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${esc(meta.canonical)}" />`,
    `<meta property="og:image" content="${esc(meta.image)}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:site_name" content="Usama Aslam" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@usama_aslam_pk" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(meta.image)}" />`,
    ...meta.jsonLd.filter(Boolean).map(
      (schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    ),
  ];
  return lines.join('\n  ');
}

// ─── Route → Component map ────────────────────────────────────────────────────
const ROUTE_MAP = [
  ['/', Home, false],
  ['/about', About, false],
  ['/projects', Project, false],
  ['/contact', Contact, false],
  ['/privacy', Privacy, false],
  ['/terms', Terms, false],
  ['/tools', ToolsHome, true],
  ['/tools/pdf-tools', PdfToolsHub, true],
  ['/tools/image-tools', ImageToolsHub, true],
  ['/tools/text-tools', TextToolsHub, true],
  ['/tools/dev-tools', DevToolsHub, true],
  ['/tools/image-to-pdf', ImageToPdf, true],
  ['/tools/pdf-compressor', PdfCompressor, true],
  ['/tools/pdf-merger', PdfMerger, true],
  ['/tools/pdf-splitter', PdfSplitter, true],
  ['/tools/word-to-pdf', WordToPdf, true],
  ['/tools/image-compressor', ImageCompressor, true],
  ['/tools/image-resizer', ImageResizer, true],
  ['/tools/qr-code-generator', QrCodeGenerator, true],
  ['/tools/json-formatter', JsonFormatter, true],
  ['/tools/password-generator', PasswordGenerator, true],
];

const DIST_DIR = path.join(process.cwd(), 'dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');

const SEO_TAG_REGEXES = [
  /<title>.*?<\/title>/gis,
  /<meta\s+name="description"[^>]*>/gis,
  /<meta\s+name="keywords"[^>]*>/gis,
  /<link\s+rel="canonical"[^>]*>/gis,
  /<meta\s+name="robots"[^>]*>/gis,
  /<meta\s+property="og:[^"]+"[^>]*>/gis,
  /<meta\s+name="twitter:[^"]+"[^>]*>/gis,
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gis,
];

function routeToOutputPath(route) {
  if (route === '/') return INDEX_PATH;
  return path.join(DIST_DIR, route.replace(/^\//, ''), 'index.html');
}

function stripExistingSeo(html) {
  return SEO_TAG_REGEXES.reduce((out, re) => out.replace(re, ''), html);
}

const validationReport = [];

async function renderRoute(route, PageComponent, isToolPage, baseTemplate) {
  // 1. Build metadata directly from data sources
  const meta = buildMeta(route);
  const headTags = buildHeadTags(meta);

  // 2. Render page content via renderToString
  let appMarkup = '';
  try {
    const pageEl = React.createElement(PageComponent);
    // For tool pages: ToolsLayout uses <Outlet> which requires router match context.
    // Instead, wrap the page in the same layout div directly.
    const content = isToolPage
      ? React.createElement(
          'div',
          { className: 'min-h-screen bg-transparent text-slate-950' },
          React.createElement(
            'main',
            { className: 'mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8' },
            pageEl,
          ),
        )
      : pageEl;

    // Wrap in HelmetProvider (no-op for SSR here, but prevents client errors)
    const tree = React.createElement(
      HelmetProvider,
      null,
      React.createElement(StaticRouter, { location: route }, content),
    );
    appMarkup = renderToString(tree);
  } catch (err) {
    console.warn(`  ⚠  renderToString threw for ${route}: ${err.message}`);
    appMarkup = '';
  }

  // 3. Inject into HTML template
  let html = baseTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${appMarkup}</div>`,
  );
  html = stripExistingSeo(html);
  html = html.replace('</head>', `  ${headTags}\n</head>`);

  const outputPath = routeToOutputPath(route);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html, 'utf8');

  // 4. Validate
  const hasTitle = /<title>[^<]{5,}<\/title>/i.test(html);
  const hasMeta = /name="description"/i.test(html);
  const hasCanonical = /rel="canonical"/i.test(html);
  const hasJsonLd = /application\/ld\+json/i.test(html);
  const hasContent = appMarkup.length > 200;
  const hasLoadingFallback = html.includes('Loading tools...');
  const status = hasTitle && hasMeta && hasContent && !hasLoadingFallback ? '✅' : '❌';

  validationReport.push({
    route, status, hasTitle, hasMeta, hasCanonical,
    hasJsonLd, hasContent, hasLoadingFallback, contentLength: appMarkup.length,
  });

  console.log(
    `${status} ${route.padEnd(40)} title=${hasTitle} meta=${hasMeta} jsonld=${hasJsonLd} chars=${appMarkup.length}`,
  );
}

async function main() {
  const baseTemplate = await fs.readFile(INDEX_PATH, 'utf8');
  console.log('\n🔧 Prerendering routes...\n');

  for (const [route, Component, isToolPage] of ROUTE_MAP) {
    await renderRoute(route, Component, isToolPage, baseTemplate);
  }

  const reportPath = path.join(DIST_DIR, 'prerender-report.json');
  await fs.writeFile(reportPath, JSON.stringify(validationReport, null, 2), 'utf8');

  const failed = validationReport.filter((r) => r.status === '❌');
  console.log(`\n📋 Prerender complete. ${ROUTE_MAP.length - failed.length}/${ROUTE_MAP.length} routes passed.`);

  if (failed.length) {
    console.error(
      `\n❌ PRERENDER FAILED for ${failed.length} route(s):\n` +
      failed.map((r) => `  ${r.route} — title=${r.hasTitle} meta=${r.hasMeta} content=${r.hasContent} loadingFallback=${r.hasLoadingFallback}`).join('\n'),
    );
    console.error('\nBuild aborted. Fix prerender errors before deploying.\n');
    process.exit(1);
  }

  console.log(`\n📄 Full report: dist/prerender-report.json\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
