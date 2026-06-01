import { useNavigate } from 'react-router-dom';
import { MdDownload } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PageSeo from '../components/PageSeo.jsx';
import { PAGES, SITE_URL } from '../seo/meta.js';
import { personSchema, webSiteSchema } from '../seo/schemas.js';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <PageSeo
        title={PAGES.home.title}
        description={PAGES.home.description}
        path={PAGES.home.path}
        image={PAGES.home.image}
        imageAlt="Usama Aslam — Full Stack Developer Portfolio"
        keywords={PAGES.home.keywords}
        jsonLd={[personSchema(), webSiteSchema()]}
      />

      <main id="main-content">
        {/* Hero */}
        <section aria-labelledby="hero-heading" className="flex flex-col justify-center items-center h-[28rem] bg-white px-4">
          <h1 id="hero-heading" className="text-3xl font-bold text-gray-800 text-center">
            Usama Aslam — Full Stack Developer
          </h1>
          <p className="text-lg text-gray-600 text-center mt-3 max-w-xl">
            MERN Stack · MongoDB · Express · React · Node.js · Next.js · Tailwind CSS
          </p>
          <a
            href="/Mern%20stack%20developer.pdf"
            download="Usama_Aslam_Resume.pdf"
            className="mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition inline-flex items-center gap-2"
            aria-label="Download Usama Aslam's resume PDF"
          >
            <MdDownload className="text-lg" aria-hidden="true" />
            Download Resume
          </a>
        </section>

        {/* Services */}
        <section aria-labelledby="services-heading" className="w-full bg-white shadow-[0_-2px_1000px_rgba(0,0,0,0.3)] py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 id="services-heading" className="text-2xl font-bold text-gray-800 mb-4">
              Services I Provide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I specialize in crafting full-stack websites and applications using the MERN stack —
              from responsive React frontends to scalable Node.js backends and MongoDB databases.
            </p>
          </div>
        </section>

        {/* About preview */}
        <section aria-labelledby="about-heading" className="flex flex-col md:flex-row p-9 max-w-screen-xl mx-auto gap-8">
          <div className="max-w-[30rem] mx-auto md:mx-0 shrink-0">
            <img
              src="https://bairesdev.mo.cloudinary.net/blog/2023/09/How-Many-Web-Developers-in-the-World-1.jpg?tx=w_1920,q_auto"
              alt="Full Stack Developer working on web applications"
              width="480"
              height="320"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          <div className="max-w-[33rem] mt-0 mx-auto md:mx-0 text-center md:text-left">
            <h2 id="about-heading" className="text-2xl font-bold">
              Meet Usama Aslam — Your Full Stack Developer
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              As a MERN Stack Developer based in Pakistan, I build full-stack web applications
              that solve real business problems. From responsive React interfaces to robust Node.js
              APIs and MongoDB databases, I deliver complete solutions — not just code.
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              I have hands-on experience with React, Node.js, Express, MongoDB, Next.js, Tailwind
              CSS, and Supabase. I focus on performance, maintainability, and delivering on time.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li>🔧 Full-stack MERN applications built from scratch</li>
              <li>🧠 React, Node.js, MongoDB, Express expertise</li>
              <li>🌟 Available for freelance and full-time remote work</li>
            </ul>
            <div className="mt-6 flex gap-3 justify-center md:justify-start flex-wrap">
              <Link to="/projects" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium">
                View Projects
              </Link>
              <Link to="/contact" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition text-sm font-medium">
                Hire Me
              </Link>
            </div>
          </div>
        </section>

        {/* Free Tools */}
        <section aria-labelledby="tools-heading" className="max-w-screen-xl mx-auto px-9 py-12">
          <h2 id="tools-heading" className="text-2xl font-bold text-gray-800 mb-2">
            Free Online Tools
          </h2>
          <p className="text-gray-600 mb-6">
            Browser-based utilities built for developers and everyday users. No upload, no signup,
            instant results. All processing happens locally in your browser.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { label: 'PDF Compressor', to: '/tools/pdf-compressor' },
              { label: 'Image to PDF', to: '/tools/image-to-pdf' },
              { label: 'QR Code Generator', to: '/tools/qr-code-generator' },
              { label: 'JSON Formatter', to: '/tools/json-formatter' },
              { label: 'Password Generator', to: '/tools/password-generator' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:border-blue-400 hover:text-blue-700 transition text-center"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/tools" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              View all free tools →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section
          aria-labelledby="cta-heading"
          className="bg-blue-950 w-full flex items-center justify-center py-20 px-4"
        >
          <div className="flex flex-col text-center items-center justify-center max-w-xl">
            <h2 id="cta-heading" className="text-4xl font-bold text-white">
              Ready to Build Something?
            </h2>
            <p className="text-blue-200 mt-3">
              Let's discuss your project and how I can help you ship faster with better code.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="px-5 py-2 mt-6 bg-white text-blue-950 font-semibold rounded hover:bg-blue-100 transition"
              aria-label="Go to contact page"
            >
              Get in Touch
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
