import { Link } from 'react-router-dom';
import ToolSeo from '../../components/tools/ToolSeo.jsx';
import ToolCard from '../../components/tools/ToolCard.jsx';
import { TOOLS } from '../../data/tools.js';
import { collectionPageSchema, breadcrumbSchema, faqSchema } from '../../seo/schemas.js';

const SITE_URL = 'https://usama-resumae.netlify.app';
const devTools = TOOLS.filter((t) => t.category === 'Productivity');

const FAQ = [
  { question: 'Are generated passwords stored anywhere?', answer: 'No. Passwords are generated locally using the browser crypto API and never transmitted to any server.' },
  { question: 'Can I download the QR code?', answer: 'Yes. The QR code exports as a PNG file you can use in print or digital materials.' },
  { question: 'What can a QR code encode?', answer: 'Any text string — URLs, email addresses, phone numbers, plain text, or vCard contact data.' },
  { question: 'How strong are the generated passwords?', answer: 'Passwords use cryptographic randomness from the browser crypto API, making them suitable for most security requirements.' },
  { question: 'Can I change the QR code color?', answer: 'Yes. Choose from 10 built-in color presets or use the custom color picker. The QR updates live as you change colors.' },
];

const jsonLd = [
  collectionPageSchema({
    name: 'Free Developer & Productivity Tools — QR Code & Password Generator',
    description: 'Free browser-based developer tools. Generate QR codes and strong passwords instantly — no signup, no server upload.',
    url: `${SITE_URL}/tools/dev-tools`,
  }),
  breadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Developer Tools', url: `${SITE_URL}/tools/dev-tools` },
  ]),
  faqSchema(FAQ),
];

export default function DevToolsHub() {
  return (
    <>
      <ToolSeo
        title="Free Developer & Productivity Tools — QR Code & Password Generator | Usama Aslam"
        description="Free browser-based developer tools: generate QR codes for URLs and text, create strong random passwords with custom settings. No signup, no server upload required."
        canonical={`${SITE_URL}/tools/dev-tools`}
        image={`${SITE_URL}/og/dev-tools.png`}
        jsonLd={jsonLd}
      />

      <main>
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Free Developer & Productivity Tools
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Utility tools built for developers, designers, and everyday productivity. Generate
            scannable QR codes for any URL or text, and create cryptographically strong passwords
            with configurable character sets. Everything runs in your browser — no account needed.
          </p>
        </header>

        <section aria-labelledby="dev-tools-heading">
          <h2 id="dev-tools-heading" className="sr-only">Available Developer Tools</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 xl:grid-cols-5">
            {devTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">QR Code Generator</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The{' '}
              <Link to="/tools/qr-code-generator" className="font-medium text-slate-900 underline underline-offset-2 hover:text-blue-700">QR Code Generator</Link>
              {' '}creates downloadable QR codes for URLs, plain text, contact details, or any string.
              Choose from 10 color presets — Classic, Ocean, Forest, Violet, Sunset, Rose, Midnight,
              Gold, Teal, and Indigo — or use the custom color picker. Output is a high-resolution
              PNG ready for print or digital use. The QR updates live as you change colors or text.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-950">Password Generator</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The{' '}
              <Link to="/tools/password-generator" className="font-medium text-slate-900 underline underline-offset-2 hover:text-blue-700">Password Generator</Link>
              {' '}uses the browser's <code className="text-xs bg-slate-100 px-1 rounded">crypto.getRandomValues()</code> API
              to produce cryptographically strong passwords. Configure length (8–32 characters),
              toggle uppercase letters, numbers, and symbols. Generated passwords are never
              transmitted anywhere — they exist only in your browser session.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-950">Use cases</h2>
            <ul className="mt-3 space-y-1 text-sm leading-7 text-slate-600">
              <li>QR codes for business cards, product packaging, and event posters</li>
              <li>QR codes linking to landing pages, app store listings, or contact forms</li>
              <li>Strong passwords for new account registrations</li>
              <li>Temporary passwords for client handoffs</li>
              <li>API keys and secret token generation for development environments</li>
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {FAQ.map(({ question, answer }) => (
              <details key={question} className="border-t border-slate-100 py-2 first:border-0">
                <summary className="cursor-pointer text-sm font-medium text-slate-950">{question}</summary>
                <p className="mt-2 text-sm leading-6 text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-semibold text-slate-950">Explore other tool categories</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link to="/tools/pdf-tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">PDF Tools</Link>
            <Link to="/tools/image-tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">Image Tools</Link>
            <Link to="/tools/text-tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">Text Tools</Link>
            <Link to="/tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">All Tools</Link>
          </div>
        </section>
      </main>
    </>
  );
}
