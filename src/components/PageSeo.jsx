/**
 * PageSeo.jsx
 * Single reusable SEO component for all portfolio pages.
 * Replaces the scattered Helmet blocks in Home, About, Projects, Contact.
 *
 * Injects:
 *  - <title>
 *  - meta description
 *  - canonical
 *  - og:* tags (with og:image:type, og:image:alt)
 *  - twitter:* tags (with twitter:site)
 *  - robots directive
 *  - JSON-LD array
 */
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../seo/schemas.js';

const TWITTER_SITE = '@usama_aslam_pk';

export default function PageSeo({
  title,
  description,
  path,
  image,
  imageAlt,
  ogType = 'website',
  robots = 'index, follow',
  jsonLd = [],
  keywords,
}) {
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/og/home.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {imageAlt ? <meta property="og:image:alt" content={imageAlt} /> : null}
      <meta property="og:site_name" content="Usama Aslam" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_SITE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {imageAlt ? <meta name="twitter:image:alt" content={imageAlt} /> : null}

      {/* JSON-LD */}
      {jsonLd.filter(Boolean).map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
