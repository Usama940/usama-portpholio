import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Footer from './pages/Footer.jsx';
import ScroltoTop from './pages/ScroltoTop.jsx';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/tools', label: 'Tools' },
  { to: '/contact', label: 'Contact' },
];

export default function App() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to main content — accessibility + SEO landmark */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-blue-950 focus:rounded focus:shadow-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <ScroltoTop />

      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 bg-blue-950 flex items-center justify-between py-4 px-4 shadow-md"
      >
        {/* Brand */}
        <NavLink to="/" className="font-bold text-2xl text-white" aria-label="Usama Aslam — Home">
          Usama Aslam
        </NavLink>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-950 rounded p-1"
          aria-expanded={isOpen}
          aria-controls="nav-menu"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Nav links */}
        <ul
          id="nav-menu"
          role="list"
          className={`
            flex-col md:flex md:flex-row md:items-center text-center
            space-y-4 md:space-y-0 md:space-x-6 text-white font-semibold
            absolute md:static bg-blue-950 w-full md:w-auto left-0 px-4 md:px-0
            transition-all duration-300 ease-in-out z-40 pb-2
            ${isOpen ? 'top-16 flex' : 'top-[-300px] hidden md:flex'}
          `}
        >
          {NAV_LINKS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'text-indigo-300 font-bold block'
                    : 'hover:text-indigo-300 block transition-colors'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => { navigate('/contact'); setIsOpen(false); }}
              className="px-4 py-1 mt-2 md:mt-0 rounded bg-white text-blue-950 font-semibold hover:bg-blue-100 transition"
              aria-label="Go to contact page"
            >
              Hire Me
            </button>
          </li>
        </ul>
      </nav>

      {/* Page content — padded for fixed nav */}
      <div className="flex-1 pt-16">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
