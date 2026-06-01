/**
 * toolsSeo.js
 * Builds structured data for tool pages.
 * Uses schema builders from schemas.js for consistency.
 */
import {
  SITE_URL,
  softwareAppSchema,
  howToSchema,
  faqSchema,
  breadcrumbSchema,
} from '../schemas.js';

/**
 * Builds the full SEO payload for a tool page.
 * Returns { title, description, canonical, image, jsonLd[] }
 */
export function buildToolSeo({
  title,
  description,
  path,
  toolName,
  featureList = [],
  howToSteps = [],
  faq = [],
  breadcrumbs = [],
  image,
}) {
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/og${path}.png`;

  const jsonLd = [
    softwareAppSchema({
      name: toolName || title,
      description,
      url: canonical,
      featureList,
    }),
    breadcrumbSchema(breadcrumbs),
  ];

  if (howToSteps.length) {
    jsonLd.push(
      howToSchema({
        name: `How to use ${toolName || title}`,
        description,
        steps: howToSteps,
      }),
    );
  }

  const faqSchemaObj = faqSchema(faq);
  if (faqSchemaObj) jsonLd.push(faqSchemaObj);

  return { title, description, canonical, image: ogImage, jsonLd };
}

// Re-export for backward compat — callers that import buildFaqSchema directly
export { faqSchema as buildFaqSchema };
