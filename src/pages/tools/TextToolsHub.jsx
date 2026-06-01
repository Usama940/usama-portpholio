import { Link } from 'react-router-dom';
import ToolSeo from '../../components/tools/ToolSeo.jsx';
import ToolCard from '../../components/tools/ToolCard.jsx';
import { TOOLS } from '../../data/tools.js';
import { collectionPageSchema, breadcrumbSchema, faqSchema } from '../../seo/schemas.js';

const SITE_URL = 'https://usama-resumae.netlify.app';
const textTools = TOOLS.filter((t) => t.category === 'Text');

const FAQ = [
  { question: 'Does the JSON formatter validate syntax?', answer: 'Yes. Invalid JSON triggers an immediate error message showing what went wrong.' },
  { question: 'Can I format very large JSON files?', answer: 'Yes, within browser memory limits. Files up to a few MB format instantly.' },
  { question: 'Is my JSON data sent to a server?', answer: 'No. All formatting and validation happens locally in your browser.' },
  { question: 'Can I download the formatted output?', answer: 'Yes. A download button exports the formatted JSON as a .json file.' },
];

const jsonLd = [
  collectionPageSchema({
    name: 'Free Online Text Tools — JSON Formatter & Text Utilities',
    description: 'Free browser-based text utilities. Format and validate JSON — all running locally in your browser.',
    url: `${SITE_URL}/tools/text-tools`,
  }),
  breadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Text Tools', url: `${SITE_URL}/tools/text-tools` },
  ]),
  faqSchema(FAQ),
];

export default function TextToolsHub() {
  return (
    <>
      <ToolSeo
        title="Free Online Text Tools — JSON Formatter & Text Utilities | Usama Aslam"
        description="Free browser-based text tools: format and validate JSON, prettify code output, and process text data — all running locally without any server upload."
        canonical={`${SITE_URL}/tools/text-tools`}
        image={`${SITE_URL}/og/text-tools.png`}
        jsonLd={jsonLd}
      />

      <main>
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Free Online Text Tools
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Browser-based text utilities for developers and content creators. Format messy JSON into
            readable output, validate syntax errors, and copy clean results with one click. No data
            leaves your browser.
          </p>
        </header>

        <section aria-labelledby="text-tools-heading">
          <h2 id="text-tools-heading" className="sr-only">Available Text Tools</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 xl:grid-cols-5">
            {textTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">JSON Formatter & Validator</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The{' '}
              <Link to="/tools/json-formatter" className="font-medium text-slate-900 underline underline-offset-2 hover:text-blue-700">JSON Formatter</Link>
              {' '}takes raw, minified, or malformed JSON and outputs a properly indented,
              human-readable version. It validates syntax in real time and highlights errors
              immediately. Useful for debugging API responses, reading configuration files, or
              cleaning up data exports. The formatted output can be copied to clipboard with one click.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-950">Use cases</h2>
            <ul className="mt-3 space-y-1 text-sm leading-7 text-slate-600">
              <li>Debugging REST API responses from Postman or browser DevTools</li>
              <li>Formatting JSON configuration files for readability</li>
              <li>Validating JSON before sending to a backend service</li>
              <li>Cleaning up minified JSON from third-party data sources</li>
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
            <Link to="/tools/dev-tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">Developer Tools</Link>
            <Link to="/tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">All Tools</Link>
          </div>
        </section>
      </main>
    </>
  );
}
