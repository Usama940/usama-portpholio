import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PageSeo from '../components/PageSeo.jsx';
import { PAGES } from '../seo/meta.js';
import { aboutPageSchema } from '../seo/schemas.js';

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <PageSeo
        title={PAGES.about.title}
        description={PAGES.about.description}
        path={PAGES.about.path}
        image={PAGES.about.image}
        imageAlt="About Usama Aslam — MERN Stack Developer from Pakistan"
        keywords={PAGES.about.keywords}
        jsonLd={[aboutPageSchema({ title: PAGES.about.title, description: PAGES.about.description })]}
      />

      <main id="main-content">
        {/* Hero */}
        <header className="bg-gradient-to-b from-white via-white to-slate-100 h-[280px] w-full flex items-center justify-center px-4 border-b border-slate-300 shadow-[inset_0_-24px_40px_-30px_rgba(15,23,42,0.35)]">
          <h1 className="text-5xl font-bold text-slate-900 text-center">
            About Usama Aslam
          </h1>
        </header>

        {/* About content */}
        <section aria-labelledby="about-intro-heading" className="flex flex-col md:flex-row justify-center items-start px-4 py-12 max-w-6xl mx-auto gap-10">
          <div className="w-full md:w-1/2">
            <h2 id="about-intro-heading" className="text-3xl font-bold text-slate-900 mb-4">
              Full Stack Developer from Pakistan
            </h2>
            <p className="text-base leading-relaxed text-slate-600">
              I'm Usama Aslam, a MERN Stack Developer based in Okara, Punjab, Pakistan. I specialize
              in building full-stack web applications using MongoDB, Express, React, and Node.js.
            </p>
            <p className="text-base leading-relaxed text-slate-600 mt-4">
              My focus is on delivering production-quality code — fast, maintainable, and scalable.
              I work with clients and businesses to turn ideas into real digital products, from
              responsive frontends to robust backend APIs.
            </p>
            <p className="text-base leading-relaxed text-slate-600 mt-4">
              Beyond client work, I build free browser-based utility tools that help developers and
              everyday users process files privately — without uploading data to any server.
            </p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <Link to="/projects" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium">
                See My Projects
              </Link>
              <Link to="/contact" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition text-sm font-medium">
                Work With Me
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://bairesdev.mo.cloudinary.net/blog/2023/09/How-Many-Web-Developers-in-the-World-1.jpg?tx=w_1920,q_auto"
              alt="Software developer working on full-stack web applications"
              width="600"
              height="400"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover rounded-md shadow-lg"
            />
          </div>
        </section>

        {/* Skills */}
        <section aria-labelledby="skills-heading" className="bg-slate-50 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 id="skills-heading" className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Technical Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Frontend Development',
                  skills: 'React, Next.js, Tailwind CSS, JavaScript, TypeScript, HTML5, CSS3',
                },
                {
                  title: 'Backend Development',
                  skills: 'Node.js, Express.js, REST API design, JWT authentication, middleware',
                },
                {
                  title: 'Database & Cloud',
                  skills: 'MongoDB, Mongoose, Supabase, PostgreSQL, Firebase',
                },
                {
                  title: 'Tools & Workflow',
                  skills: 'Git, GitHub, VS Code, Postman, Netlify, Vercel, npm',
                },
                {
                  title: 'Performance & SEO',
                  skills: 'Core Web Vitals, Lighthouse, structured data, semantic HTML, Vite',
                },
                {
                  title: 'Currently Learning',
                  skills: 'Docker, AWS basics, GraphQL, advanced TypeScript patterns',
                },
              ].map(({ title, skills }) => (
                <article key={title} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-blue-950 mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{skills}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose */}
        <section aria-labelledby="why-heading" className="py-12 px-4 max-w-6xl mx-auto">
          <h2 id="why-heading" className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Why Work With Me
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '💡', title: 'Technical Depth', desc: 'Full-stack expertise across the entire MERN stack with real project experience.' },
              { icon: '🛠️', title: 'Custom Solutions', desc: 'Every project is built to your specific requirements — no generic templates.' },
              { icon: '🤝', title: 'Reliable Delivery', desc: 'Committed to quality, clear communication, and on-time delivery.' },
            ].map(({ icon, title, desc }) => (
              <article key={title} className="text-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="text-3xl" aria-hidden="true">{icon}</span>
                <h3 className="text-lg font-semibold text-blue-950 mt-3">{title}</h3>
                <p className="text-slate-600 text-sm mt-2">{desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="about-cta-heading" className="bg-blue-950 py-16 px-4 text-center">
          <h2 id="about-cta-heading" className="text-3xl font-bold text-white">Ready to Start a Project?</h2>
          <p className="text-blue-200 mt-3 max-w-md mx-auto">
            Let's discuss your requirements and build something great together.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="mt-6 px-6 py-2 bg-white text-blue-950 font-semibold rounded hover:bg-blue-100 transition"
            aria-label="Go to contact page"
          >
            Get in Touch
          </button>
        </section>
      </main>
    </>
  );
}
