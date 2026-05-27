import { useNavigate } from "react-router-dom";
import { MdDownload } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { PAGES, SITE } from "../seo/meta.js";

export default function Home() {
    const navigate = useNavigate();

    return (
                <>
                <Helmet>
                    <title>{PAGES.home.title}</title>
                    <meta name="description" content={PAGES.home.description} />
                    <meta name="keywords" content={PAGES.home.keywords} />
                    <link rel="canonical" href={`${SITE.domain}${PAGES.home.path}`} />

                    <meta property="og:title" content={PAGES.home.title} />
                    <meta property="og:description" content={PAGES.home.description} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`${SITE.domain}${PAGES.home.path}`} />
                    <meta property="og:site_name" content="Usama Aslam Portfolio" />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:image" content={`${SITE.domain}${PAGES.home.image}`} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={PAGES.home.title} />
                    <meta name="twitter:description" content={PAGES.home.description} />
                    <meta name="twitter:image" content={`${SITE.domain}${PAGES.home.image}`} />
                    <meta name="twitter:image:alt" content="Usama Aslam - MERN Stack Developer Portfolio" />

                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            name: "Usama Aslam",
                            url: SITE.domain,
                            jobTitle: "MERN Stack Developer",
                            sameAs: [
                                "https://www.linkedin.com/in/usamaaslam-pakistan",
                                "https://www.facebook.com/share/1YXWeEdnpm/",
                            ],
                        })}
                    </script>
                </Helmet>

                <div className="w-screen overflow-x-hidden">
            {/* Hero Section */}
            <div className="flex flex-col justify-center items-center h-[28rem] bg-white">
                <h1 className="text-3xl font-bold text-gray-800 text-center">
                    Usama Aslam – Full Stack Developer
                </h1>
                <p className="text-lg text-gray-600 text-center">
                    MERN Stack | MongoDB | Express | React | Node.js | Next.js | Tailwind CSS | Supabase
                </p>

                {/* ✅ Download Button */}
                <a
                    href="/Mern%20stack%20developer.pdf"
                    download="Usama_Resume.pdf"
                    className="mt-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition inline-flex items-center gap-2"
                >
                    <MdDownload className="text-lg" />
                    Download
                </a>
            </div>





            {/* Services Section */}
            <div className="w-full bg-white shadow-[0_-2px_1000px_rgba(0,0,0,0.3)]  h-[20rem] flex items-center" >
                <div className="max-w-7xl mx-auto px-4 py-12 text-center ">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Services I Provide
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        I specialize in crafting full-stack websites and apps using the MERN stack.
                    </p>
                </div>
            </div>

            <div className='flex flex-col md:flex-row p-9 max-w-screen-xl mx-auto'>
                <div className='max-w-[30rem] mx-auto md:mx-0'>
                    <img
                        src="https://bairesdev.mo.cloudinary.net/blog/2023/09/How-Many-Web-Developers-in-the-World-1.jpg?tx=w_1920,q_auto"
                        alt="Web Development Banner"
                        className='w-full h-auto object-cover rounded-md'
                    />
                </div>
                <div className='pl-0 md:pl-20 max-w-[33rem] mt-8 md:mt-0 mx-auto md:mx-0 text-center md:text-left'>
                    <h2 className='text-2xl font-bold'>Meet Usama Aslam – Your Full Stack Developer</h2>
                    <p className='mt-4'>
                        As a passionate MERN Stack Developer, I focus on turning ideas into powerful digital products. From building responsive web interfaces to developing robust backend systems, I deliver full-stack solutions tailored to real business goals.
                        <br /><br />
                        With hands-on experience in MongoDB, Express, React, and Node.js, I craft fast, reliable, and scalable applications that not only function well — but also feel great to use.
                    </p>
                    <ul className='mt-6 space-y-2'>
                        <li>🔧 2+ Custom Projects Build</li>
                        <li>🧠 6+ Months of Development Experience</li>
                        <li>🌟 Committed to Quality, Timely Delivery & Client Success</li>
                    </ul>
                </div>


            </div>
            <div className="bg-[url('https://interwood.pk/cdn/shop/files/Voyage1.webp?v=1753964549')] bg-cover bg-center bg-no-repeat h-86 w-full flex items-center justify-center">


                <div className='flex flex-col text-center items-center justify-center px-4'>


                    <h4 className='text-4xl font-bold m-3 text-white'>Prepared for Growth?</h4>

                    <p className='text-white '>
                        Connect with us now to explore your project and find out how we can support your success
                    </p>

                    <button onClick={() => navigate("/contact")} className="px-5 py-2 mt-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Get Started
                    </button>
                </div>
            </div>

        </div>
        </>
    );
}
