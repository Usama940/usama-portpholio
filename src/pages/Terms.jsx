import { Link } from 'react-router-dom';
import PageSeo from '../components/PageSeo.jsx';

export default function Terms() {
  return (
    <>
      <PageSeo
        title="Terms of Service — Usama Aslam Portfolio & Tools"
        description="Terms of service for Usama Aslam's free browser-based tools. Provided as-is for personal and commercial use with no warranty."
        path="/terms"
        robots="noindex, follow"
      />

      <main id="main-content" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 pt-24">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="text-slate-900">Terms of Service</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-950">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: May 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-7 text-slate-700">
          <section>
            <h2 className="text-lg font-semibold text-slate-950">Acceptance of terms</h2>
            <p className="mt-2">
              By using Usama Aslam's tools platform or portfolio website, you agree to these terms.
              If you do not agree, please do not use the services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">Use of tools</h2>
            <p className="mt-2">
              All tools are provided free of charge for personal and commercial use. You may use the
              output of any tool (compressed PDFs, converted files, generated QR codes, passwords)
              for any lawful purpose. You are responsible for ensuring you have the right to process
              any files you use with these tools.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">No warranty</h2>
            <p className="mt-2">
              Tools are provided "as is" without warranty of any kind. We do not guarantee that
              output files will meet specific quality, size, or format requirements. Always verify
              output files before use in critical applications.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">Limitation of liability</h2>
            <p className="mt-2">
              We are not liable for any loss of data, file corruption, or damages arising from the
              use of these tools. Always keep backups of important files before processing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-950">Contact</h2>
            <p className="mt-2">
              Questions about these terms:{' '}
              <a href="mailto:usama24.2r@gmail.com" className="text-blue-600 hover:underline">
                usama24.2r@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 flex gap-4 text-sm">
          <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          <Link to="/tools" className="text-blue-600 hover:underline">Free Tools</Link>
        </div>
      </main>
    </>
  );
}
