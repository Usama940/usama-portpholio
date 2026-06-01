import { Link } from 'react-router-dom';
import ToolSeo from '../../components/tools/ToolSeo.jsx';
import ToolCard from '../../components/tools/ToolCard.jsx';
import { TOOLS } from '../../data/tools.js';
import { collectionPageSchema, breadcrumbSchema, faqSchema } from '../../seo/schemas.js';

const SITE_URL = 'https://usama-resumae.netlify.app';
const imageTools = TOOLS.filter((t) => t.category === 'Image');

const FAQ = [
  { question: 'What image formats are supported?', answer: 'JPG, JPEG, PNG, and WebP are supported across all image tools.' },
  { question: 'Does image compression reduce quality?', answer: 'Compression reduces file size by lowering quality slightly. You control the quality level with the compression slider.' },
  { question: 'Can I compress multiple images at once?', answer: 'Yes. The Image Compressor supports batch uploads.' },
  { question: 'Will resizing change the aspect ratio?', answer: 'The resizer uses the exact dimensions you enter. To preserve aspect ratio, calculate the proportional height before resizing.' },
  { question: 'Are transparent PNG backgrounds preserved?', answer: 'Yes. The Image Compressor preserves PNG transparency.' },
];

const jsonLd = [
  collectionPageSchema({
    name: 'Free Online Image Tools — Compress & Resize Images',
    description: 'Free browser-based image tools. Compress images to reduce file size and resize images to exact dimensions — no upload, no signup.',
    url: `${SITE_URL}/tools/image-tools`,
  }),
  breadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Image Tools', url: `${SITE_URL}/tools/image-tools` },
  ]),
  faqSchema(FAQ),
];

export default function ImageToolsHub() {
  return (
    <>
      <ToolSeo
        title="Free Online Image Tools — Compress & Resize Images | Usama Aslam"
        description="Free browser-based image tools: compress images to reduce file size and resize images to exact pixel dimensions. No upload required, works in any browser."
        canonical={`${SITE_URL}/tools/image-tools`}
        image={`${SITE_URL}/og/image-tools.png`}
        jsonLd={jsonLd}
      />

      <main>
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Free Online Image Tools
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Compress images before uploading to websites, social media, or email. Resize images to
            exact pixel dimensions for design assets, thumbnails, or profile pictures. All processing
            happens in your browser — no files are sent to any server.
          </p>
        </header>

        <section aria-labelledby="image-tools-heading">
          <h2 id="image-tools-heading" className="sr-only">Available Image Tools</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 xl:grid-cols-5">
            {imageTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Image Compressor</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Large image files slow down websites and consume mobile data. The{' '}
              <Link to="/tools/image-compressor" className="font-medium text-slate-900 underline underline-offset-2 hover:text-blue-700">Image Compressor</Link>
              {' '}reduces file size by adjusting compression quality while preserving visual fidelity.
              Supports JPG, PNG, and WebP. Transparent PNG backgrounds are preserved.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-950">Image Resizer</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The{' '}
              <Link to="/tools/image-resizer" className="font-medium text-slate-900 underline underline-offset-2 hover:text-blue-700">Image Resizer</Link>
              {' '}lets you set exact width and height values in pixels. Output is rendered on an
              HTML5 canvas and exported as JPEG. Useful for thumbnails, social media images, and
              product photos.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-950">Privacy & file security</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Image processing uses the browser's native Canvas API and the{' '}
              <strong>browser-image-compression</strong> library. No image data is transmitted
              externally. Files exist only in browser memory during processing.
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
            <Link to="/tools/pdf-tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">PDF Tools</Link>
            <Link to="/tools/text-tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">Text Tools</Link>
            <Link to="/tools/dev-tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">Developer Tools</Link>
            <Link to="/tools" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400">All Tools</Link>
          </div>
        </section>
      </main>
    </>
  );
}
