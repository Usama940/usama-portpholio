import PageSeo from '../components/PageSeo.jsx';
import { PAGES } from '../seo/meta.js';
import { projectListSchema } from '../seo/schemas.js';
import weather from '../assets/weather.jpg';
import Iresonate from '../assets/Iresonate.jpg';
import firstProject from '../assets/firstProject.jpg';
import ndProject from '../assets/ndProject.jpg';

const PROJECTS = [
  {
    name: 'Weather App',
    description: 'A real-time weather application built with React that fetches live weather data from an external API. Features city search, temperature display, and weather condition icons.',
    tech: 'React, REST API, CSS',
    src: weather,
    alt: 'Weather App — React weather application showing real-time temperature and conditions',
  },
  {
    name: 'iResonate',
    description: 'A full-stack web application built with the MERN stack. Features user authentication, dynamic content management, and a responsive interface.',
    tech: 'MongoDB, Express, React, Node.js',
    src: Iresonate,
    alt: 'iResonate — MERN stack full-stack web application',
  },
  {
    name: 'Portfolio Platform',
    description: 'A developer portfolio platform with project showcase, contact form, and integrated free utility tools. Built with React, Vite, and Tailwind CSS.',
    tech: 'React, Vite, Tailwind CSS, Node.js',
    src: firstProject,
    alt: 'Portfolio Platform — React and Vite developer portfolio with utility tools',
  },
  {
    name: 'Full Stack Dashboard',
    description: 'An admin dashboard application with data visualization, user management, and real-time updates. Built with React frontend and Node.js backend.',
    tech: 'React, Node.js, MongoDB, Chart.js',
    src: ndProject,
    alt: 'Full Stack Dashboard — React admin dashboard with Node.js backend',
  },
];

export default function Project() {
  return (
    <>
      <PageSeo
        title={PAGES.projects.title}
        description={PAGES.projects.description}
        path={PAGES.projects.path}
        image={PAGES.projects.image}
        imageAlt="Projects by Usama Aslam — React and MERN Stack Portfolio"
        keywords={PAGES.projects.keywords}
        jsonLd={[
          projectListSchema(
            PROJECTS.map((p) => ({ name: p.name, description: p.description })),
          ),
        ]}
      />

      <main id="main-content">
        <header className="bg-gradient-to-b from-white via-white to-slate-100 py-16 px-4 text-center border-b border-slate-300 shadow-[inset_0_-24px_40px_-30px_rgba(15,23,42,0.35)]">
          <h1 className="text-4xl font-bold text-slate-900">Projects by Usama Aslam</h1>
          <p className="text-slate-600 mt-3 max-w-xl mx-auto">
            Full-stack web applications built with React, Node.js, MongoDB, and Express.
          </p>
        </header>

        <section aria-labelledby="projects-list-heading" className="max-w-6xl mx-auto px-4 py-12">
          <h2 id="projects-list-heading" className="sr-only">Project list</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <article
                key={project.name}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={project.src}
                    alt={project.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{project.description}</p>
                  <p className="text-xs text-blue-700 font-medium mt-3">
                    Tech: {project.tech}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="tools-cta-heading" className="bg-slate-50 py-12 px-4 text-center border-t border-slate-200">
          <h2 id="tools-cta-heading" className="text-xl font-semibold text-slate-900">
            Also check out my free browser tools
          </h2>
          <p className="text-slate-600 mt-2 text-sm max-w-md mx-auto">
            PDF compressor, image converter, QR code generator, and more — all running locally in your browser.
          </p>
          <a
            href="/tools"
            className="mt-4 inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
          >
            View Free Tools
          </a>
        </section>
      </main>
    </>
  );
}
