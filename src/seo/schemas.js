/**
 * schemas.js
 * Single source of truth for all JSON-LD schema objects.
 * Every schema is a pure function — no side effects, fully testable.
 * Import and compose these in page components or the prerender pipeline.
 */

export const SITE_URL = 'https://usama-resumae.netlify.app';

// ─── Person ──────────────────────────────────────────────────────────────────
export const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Usama Aslam',
  url: SITE_URL,
  jobTitle: 'Full Stack Developer',
  description:
    'MERN Stack Developer specializing in React, Node.js, MongoDB, and Express. Based in Okara, Punjab, Pakistan.',
  image: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/Dp.jpg`,
    width: 400,
    height: 400,
  },
  email: 'usama24.2r@gmail.com',
  telephone: '+923177725284',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Okara',
    addressRegion: 'Punjab',
    addressCountry: 'PK',
  },
  sameAs: [
    'https://www.linkedin.com/in/usamaaslam-pakistan',
    'https://www.facebook.com/share/1YXWeEdnpm/',
    'https://www.instagram.com/chusamasangoka/',
  ],
  knowsAbout: [
    'MongoDB',
    'Express.js',
    'React',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
    'Next.js',
    'Full Stack Web Development',
    'REST API Development',
  ],
  worksFor: { '@type': 'Organization', name: 'Freelance' },
});

// ─── WebSite + SearchAction ───────────────────────────────────────────────────
export const webSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Usama Aslam',
  url: SITE_URL,
  description:
    'Portfolio and free browser-based utility tools by Usama Aslam — Full Stack Developer from Pakistan.',
  publisher: { '@id': `${SITE_URL}/#person` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/tools?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

// ─── Organization (tools platform) ───────────────────────────────────────────
export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Usama Aslam',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/favicon.png`,
    width: 192,
    height: 192,
  },
  founder: { '@id': `${SITE_URL}/#person` },
  description:
    'Free browser-based utility tools by Usama Aslam for PDF processing, image editing, QR code generation, JSON formatting, and password generation.',
});

// ─── BreadcrumbList ───────────────────────────────────────────────────────────
export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

// ─── SoftwareApplication ─────────────────────────────────────────────────────
export const softwareAppSchema = ({ name, description, url, featureList = [], howToSteps = [] }) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description,
  url,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  browserRequirements: 'Requires JavaScript-enabled modern browser',
  inLanguage: 'en',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: featureList.join(', '),
  creator: { '@id': `${SITE_URL}/#person` },
});

// ─── HowTo ────────────────────────────────────────────────────────────────────
export const howToSchema = ({ name, description, steps }) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  description,
  step: steps.map((text, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: `Step ${i + 1}`,
    text,
  })),
});

// ─── FAQPage ──────────────────────────────────────────────────────────────────
export const faqSchema = (items) => {
  if (!items?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
};

// ─── CollectionPage (category hubs) ──────────────────────────────────────────
export const collectionPageSchema = ({ name, description, url }) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  description,
  url,
  inLanguage: 'en',
  creator: { '@id': `${SITE_URL}/#person` },
});

// ─── AboutPage ────────────────────────────────────────────────────────────────
export const aboutPageSchema = ({ title, description }) => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: title,
  url: `${SITE_URL}/about`,
  description,
  mainEntity: { '@id': `${SITE_URL}/#person` },
});

// ─── ContactPage ──────────────────────────────────────────────────────────────
export const contactPageSchema = ({ title }) => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: title,
  url: `${SITE_URL}/contact`,
  mainEntity: { '@id': `${SITE_URL}/#person` },
});

// ─── ItemList (projects) ──────────────────────────────────────────────────────
export const projectListSchema = (projects) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Projects by Usama Aslam',
  url: `${SITE_URL}/projects`,
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    description: p.description,
    url: p.url || `${SITE_URL}/projects`,
  })),
});
