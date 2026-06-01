import { Link } from 'react-router-dom';
import ToolSeo from '../../components/tools/ToolSeo.jsx';
import ToolCard from '../../components/tools/ToolCard.jsx';
import { TOOLS } from '../../data/tools.js';
import { collectionPageSchema, breadcrumbSchema, faqSchema } from '../../seo/schemas.js';

const SITE_URL = 'https://usama-resumae.netlify.app';
const pdfTools = TOOLS.filter((t) => t.category === 'PDF');

const FAQ = [
  { question: 'Are these PDF tools free to use?', answer: 'Yes. All PDF tools are completely free with no usage limits.' },
  { question: 'Do my PDF files get uploaded to a server?', answer: 'No. Every tool processes files locally in your browser. Your files never leave your device.' },
  { question: 'What is the maximum file size supported?', answer: 'There is no hard limit, but very large files (100MB+) may be slow depending on your device memory.' },
  { question: 'Do I need to install any software?', answer: 'No installation required. Tools run in any modern browser — Chrome, Firefox, Edge, or Safari.' },
  { question: 'Can I use these tools on mobile?', answer: 'Yes. All tools are responsive and work on mobile browsers, though desktop is recommended for large files.' },
];

const jsonLd = [
  collectionPageSchema({
    name: 'Free Online PDF Tools — Compress, Merge, Split & Convert',
    description: 'Free browser-based PDF tools. Compress, merge, split, convert Word to PDF, and convert images to PDF — no upload, no signup.',
    url: `${SITE_URL}/tools/pdf-tools`,
  }),
  breadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'PDF Tools', url: `${SITE_URL}/tools/pdf-tools` },
  ]),
  faqSchema(FAQ),
];

export default function PdfToolsHub() {
  return (
    <>
      <ToolSeo
        title="Free Online PDF Tools — Compress, Merge, Split & Convert | Usama Aslam"
        description="Free browser-based PDF tools: compress PDF, merge PDFs, split PDF pages, convert images to PDF, and convert Word to PDF. No upload, no signup, instant results."
        canonical={`${SITE_URL}/tools/pdf-tools`}
        image={`${SITE_URL}/og/pdf-tools.png`}
        jsonLd={jsonLd}
      />

      <main>
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Free Online PDF Tools
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            A complete set of browser-based PDF utilities. Compress oversized PDFs before emailing,
            merge multiple documents into one, extract specific pages, or convert images and Word
            files into PDF format — all without installing software or uploading files to a server.
          </p>
        </header>

        <section aria-labelledby="pdf-tools-heading">
          <h2 id="pdf-tools-heading" className="sr-only">Available PDF Tools</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 xl:grid-cols-5">
            {pdfTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Why use browser-based PDF tools?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Traditional PDF software requires installation, licensing fees, and often sends your
              documents to remote servers. Browser-based tools eliminate all of that. Your files are
              processed entirely within your device's memory using modern Web APIs — no data ever
              leaves your browser session.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This approach is faster for small to medium files, works on any operating system, and
              requires no account creation. It is ideal for professionals who handle sensitive
              documents such as contracts, invoices, medical records, or financial reports.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-950">Available PDF tools</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
              <li>
                <Link to="/tools/pdf-compressor" className="font-medium text-slate-900 underline underline-offset-2 hover:text-blue-700">PDF Compressor</Link>
                {' '}— Reduce PDF file size for email attachments, web uploads, or storage.
              </li>
              <li>
                <Link to="/tools/pdf-merger" className="font-medium text-slate-900 underline underline-offset-2 hover:text-blue-700">PDF Merger</Link>
                {' '}— Combine multiple PDF documents into a single file with drag-to-reorder.
              </li>
              <li>
                <Link to="/tools/pdf-splitter" className="font-medium text-slate-900 underline underline-offset-2 hover:text-blue-700">PDF Splitter</Link>
                {' '}— Extract a specific page range from any PDF document.
              </li>
              <li>
                <Link to="/tools/image-to-pdf" className="font-medium text-slate-900 underline underline-offset-2 hover:text-blue-700">Image to PDF</Link>
                {' '}— Convert JPG, PNG, or WebP images into a clean multi-page PDF.
              </li>
              <li>
                <Link to="/tools/word-to-pdf" className="font-medium text-slate-900 underline underline-offset-2 hover:text-blue-700">Word to PDF</Link>
                {' '}— Convert DOCX files to PDF format directly in the browser.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-950">Privacy & file security</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              All processing happens locally using <strong>pdf-lib</strong>, <strong>jsPDF</strong>,
              and <strong>PDF.js</strong>. No file data is transmitted to any server. Files are held
              in browser memory only for the duration of the operation.
            </p>
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
            <Link to="/tools/image-tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">Image Tools</Link>
            <Link to="/tools/text-tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">Text Tools</Link>
            <Link to="/tools/dev-tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">Developer Tools</Link>
            <Link to="/tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">All Tools</Link>
          </div>
        </section>
      </main>
    </>
  );
}
