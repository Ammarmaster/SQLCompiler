/**
 * Single source of truth for the brand / founder entity data used in
 * JSON-LD, metadata and llms.txt. Search engines and AI assistants build a
 * "knowledge graph" entry by matching the same @id, names and sameAs links
 * across pages — so every page must reference these exact values.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sqlcompiler.jobsio.in';

export const PERSON_URL = `${SITE_URL}/ammar-master-jalaluddin-master`;
export const PERSON_ID = `${PERSON_URL}#person`;
export const PERSON_IMAGE = `${SITE_URL}/ammar-master-jalaluddin-master-founder-at-prodevopz.jpg`;

export const ORG_URL = 'https://prodevopz.jobsio.in';
export const ORG_PAGE_URL = `${SITE_URL}/prodevopz`;
export const ORG_ID = `${ORG_PAGE_URL}#organization`;

export const WEBSITE_ID = `${SITE_URL}/#website`;
export const APP_ID = `${SITE_URL}/#software`;

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/ammarmaster',
  github: 'https://github.com/ammarmaster',
  x: 'https://x.com/Ammarmaster_',
  repo: 'https://github.com/Ammarmaster/SQLCompiler',
};

export const PERSON_NAMES = [
  'Jalaluddin Master',
  'Ammar Master (Jalaluddin Master)',
  'Ammar Master ProDevOpz',
  'Jalaluddin Master ProDevOpz',
  'Ammarmaster',
];

export const ORG_NAMES = ['Pro DevOpz', 'ProDevOpz AI', 'ProDevops', 'Pro Devops AI'];

export const personSchema = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Ammar Master',
  givenName: 'Ammar',
  familyName: 'Master',
  alternateName: PERSON_NAMES,
  jobTitle: 'Founder & CEO of ProDevOpz',
  description:
    'Ammar Master (also known as Jalaluddin Master) is a software engineer, cloud & DevOps architect, the Founder & CEO of ProDevOpz, and the creator of SQLite Studio — the free online SQL compiler at sqlcompiler.jobsio.in.',
  disambiguatingDescription:
    'Software engineer and founder of ProDevOpz; creator of the SQLite Studio online SQL compiler.',
  url: PERSON_URL,
  mainEntityOfPage: PERSON_URL,
  image: {
    '@type': 'ImageObject',
    url: PERSON_IMAGE,
    caption: 'Ammar Master (Jalaluddin Master), Founder & CEO of ProDevOpz',
    width: 1000,
    height: 1000,
  },
  worksFor: { '@id': ORG_ID },
  knowsAbout: [
    'Software Engineering',
    'Cloud Architecture',
    'DevOps',
    'CI/CD',
    'Kubernetes',
    'SQL',
    'SQLite',
    'WebAssembly',
    'Next.js',
    'Developer Tools',
    'Artificial Intelligence',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Engineer & Cloud Architect',
    skills: 'Cloud Architecture, DevOps, CI/CD, SQLite WebAssembly, Next.js, TypeScript, Database Systems',
  },
  sameAs: [ORG_URL, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github, SOCIAL_LINKS.x],
};

export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'ProDevOpz',
  alternateName: ORG_NAMES,
  url: ORG_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/icon.png`,
    width: 512,
    height: 512,
  },
  description:
    'ProDevOpz (ProDevOpz AI) is a software engineering, cloud architecture, DevOps and AI-tooling company founded by Ammar Master (Jalaluddin Master). It builds developer platforms such as SQLite Studio, the free online SQL compiler.',
  founder: { '@id': PERSON_ID },
  employee: { '@id': PERSON_ID },
  knowsAbout: ['Cloud Infrastructure', 'DevOps', 'CI/CD', 'Kubernetes', 'AI Tools', 'Developer Platforms'],
  sameAs: [ORG_URL, ORG_PAGE_URL],
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'SQL Compiler',
  alternateName: ['SQL Compiler Online', 'SQLite Studio', 'SqlOnline'],
  url: SITE_URL,
  inLanguage: 'en',
  author: { '@id': PERSON_ID },
  creator: { '@id': PERSON_ID },
  publisher: { '@id': ORG_ID },
};

export const softwareSchema = {
  '@type': 'SoftwareApplication',
  '@id': APP_ID,
  name: 'SQL Compiler — SQLite Studio',
  url: SITE_URL,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (Web Browser)',
  author: { '@id': PERSON_ID },
  creator: { '@id': PERSON_ID },
  publisher: { '@id': ORG_ID },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Free, client-side online SQL compiler and IDE powered by SQLite WebAssembly. Features line-by-line query execution, live ER diagram table relationship visualization, and instant data grid results.',
  featureList: [
    'In-browser SQLite WebAssembly execution',
    'Interactive ER Diagram table relationship visualizer',
    'Line-by-line gutter run buttons',
    'Sortable spreadsheet results grid with CSV/JSON export',
    'Pre-loaded ERP sample database',
    'Zero signup and 100% offline privacy',
  ],
  sameAs: [SOCIAL_LINKS.repo],
};

/** Full entity graph, injected once in the root layout. */
export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [personSchema, organizationSchema, websiteSchema, softwareSchema],
};
