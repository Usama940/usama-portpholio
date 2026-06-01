/**
 * meta.js
 * Central SEO configuration for all portfolio pages.
 * Used by page components and the prerender pipeline.
 */

export const SITE_URL = 'https://usama-resumae.netlify.app';

export const SITE = {
  domain: SITE_URL,
  name: 'Usama Aslam',
  defaultTitle: 'Usama Aslam — Full Stack Developer & MERN Stack Engineer',
  defaultDescription:
    'Portfolio of Usama Aslam — MERN Stack Developer (React, Node.js, MongoDB, Express) based in Pakistan. Available for freelance and full-time work.',
  defaultImage: '/og/home.png',
};

export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Usama Aslam',
  url: 'https://usama-resumae.netlify.app',
  jobTitle: 'Full Stack Developer',
  description:
    'MERN Stack Developer specializing in React, Node.js, MongoDB, and Express. Based in Okara, Punjab, Pakistan.',
  image: 'https://usama-resumae.netlify.app/Dp.jpg',
  email: 'mailto:usama24.2r@gmail.com',
  telephone: '+923177725284',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Okara',
    addressRegion: 'Punjab',
    addressCountry: 'PK',
  },
  sameAs: [
    'https://www.linkedin.com/in/usamaaslam-pakistan',
    'https://github.com/usama-aslam',
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
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
};

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Usama Aslam Tools',
  url: 'https://usama-resumae.netlify.app/tools',
  description:
    'Free browser-based utility tools for PDF processing, image editing, QR code generation, JSON formatting, and password generation.',
  founder: {
    '@type': 'Person',
    name: 'Usama Aslam',
    url: 'https://usama-resumae.netlify.app',
  },
};

export const PAGES = {
  home: {
    title: 'Usama Aslam — Full Stack Developer & MERN Stack Engineer',
    description:
      'Usama Aslam is a MERN Stack Developer from Pakistan specializing in React, Node.js, MongoDB, and Express. Available for freelance and full-time projects.',
    path: '/',
    image: '/og/home.png',
    keywords:
      'Usama Aslam, Full Stack Developer, MERN Stack Developer, React Developer Pakistan, Node.js Developer, MongoDB, Express, JavaScript Developer Pakistan',
  },
  about: {
    title: 'About Usama Aslam — MERN Stack Developer from Pakistan',
    description:
      'Learn about Usama Aslam — a MERN Stack Developer from Okara, Pakistan with experience building full-stack web applications using React, Node.js, and MongoDB.',
    path: '/about',
    image: '/og/about.png',
    keywords:
      'About Usama Aslam, MERN developer Pakistan, React developer Pakistan, Full Stack Developer Okara',
  },
  projects: {
    title: 'Projects by Usama Aslam — React & MERN Stack Portfolio',
    description:
      'Explore full-stack web projects built by Usama Aslam using React, Node.js, MongoDB, and Express. Case studies, screenshots, and live demo links.',
    path: '/projects',
    image: '/og/projects.png',
    keywords: 'Usama Aslam projects, React projects Pakistan, MERN stack projects, full stack portfolio',
  },
  contact: {
    title: 'Contact Usama Aslam — Hire a MERN Stack Developer',
    description:
      'Get in touch with Usama Aslam for MERN stack development, React applications, and full-stack web projects. Available for hire in Pakistan and remotely.',
    path: '/contact',
    image: '/og/contact.png',
    keywords: 'Contact Usama Aslam, hire MERN developer Pakistan, React freelancer Pakistan, hire full stack developer',
  },
};
