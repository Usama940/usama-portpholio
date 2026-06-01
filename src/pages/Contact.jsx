import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaSquareInstagram } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';
import ContactForm from './ContactForm.jsx';
import PageSeo from '../components/PageSeo.jsx';
import { PAGES } from '../seo/meta.js';
import { contactPageSchema } from '../seo/schemas.js';

export default function Contact() {
  return (
    <>
      <PageSeo
        title={PAGES.contact.title}
        description={PAGES.contact.description}
        path={PAGES.contact.path}
        image={PAGES.contact.image}
        imageAlt="Contact Usama Aslam — Hire a MERN Stack Developer"
        keywords={PAGES.contact.keywords}
        jsonLd={[contactPageSchema({ title: PAGES.contact.title })]}
      />

      <main id="main-content" className="bg-slate-50 min-h-screen">
        <header className="bg-gradient-to-b from-white via-white to-slate-100 py-16 px-4 text-center border-b border-slate-300 shadow-[inset_0_-24px_40px_-30px_rgba(15,23,42,0.35)]">
          <h1 className="text-4xl font-bold text-slate-900">Contact Usama Aslam</h1>
          <p className="text-slate-600 mt-3 max-w-md mx-auto">
            Available for freelance projects, full-time roles, and collaborations.
          </p>
        </header>

        <div className="flex flex-col md:flex-row justify-center items-start gap-12 px-6 md:px-20 py-16 max-w-6xl mx-auto">
          {/* Contact info */}
          <section aria-labelledby="contact-info-heading" className="w-full md:w-1/2">
            <h2 id="contact-info-heading" className="font-bold text-blue-950 text-2xl mb-6">
              Get in Touch
            </h2>

            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-1">Phone</h3>
                <a href="tel:+923177725284" className="text-gray-700 hover:text-blue-700 transition">
                  +92 317 772 5284
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-1">Email</h3>
                <a href="mailto:usama24.2r@gmail.com" className="text-gray-700 hover:text-blue-700 transition">
                  usama24.2r@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-1">Location</h3>
                <p className="text-gray-700">Okara, Punjab, Pakistan</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-2">Social</h3>
                <ul className="flex gap-4 text-2xl" aria-label="Social media links">
                  <li>
                    <a href="https://wa.me/923177725284" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-green-600 transition-colors">
                      <IoLogoWhatsapp />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/share/1YXWeEdnpm/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600 transition-colors">
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/chusamasangoka/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-600 transition-colors">
                      <FaSquareInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/usamaaslam-pakistan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-700 transition-colors">
                      <FaLinkedin />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact form */}
          <section aria-labelledby="contact-form-heading" className="w-full md:w-1/2">
            <h2 id="contact-form-heading" className="font-bold text-blue-950 text-2xl mb-6">
              Send a Message
            </h2>
            <ContactForm />
          </section>
        </div>
      </main>
    </>
  );
}
