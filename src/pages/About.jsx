import React from 'react'
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PAGES, SITE } from "../seo/meta.js";

export default function About() {
    const navigate = useNavigate();
    return (
        <div>

            {/* Hero Section */}
            <Helmet>
              <title>{PAGES.about.title}</title>
              <meta name="description" content={PAGES.about.description} />
              <meta name="keywords" content={PAGES.about.keywords} />
              <link rel="canonical" href={`${SITE.domain}${PAGES.about.path}`} />
                            <meta property="og:title" content={PAGES.about.title} />
                            <meta property="og:description" content={PAGES.about.description} />
                            <meta property="og:type" content="website" />
                            <meta property="og:url" content={`${SITE.domain}${PAGES.about.path}`} />
                            <meta property="og:site_name" content="Usama Aslam Portfolio" />
                            <meta property="og:locale" content="en_US" />
                            <meta property="og:image" content={`${SITE.domain}${PAGES.about.image}`} />
                            <meta property="og:image:width" content="1200" />
                            <meta property="og:image:height" content="630" />
                            <meta name="twitter:card" content="summary_large_image" />
                            <meta name="twitter:title" content={PAGES.about.title} />
                            <meta name="twitter:description" content={PAGES.about.description} />
                            <meta name="twitter:image" content={`${SITE.domain}${PAGES.about.image}`} />
                            <meta name="twitter:image:alt" content="About Usama Aslam" />
                            <script type="application/ld+json">
                                {JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "AboutPage",
                                    name: PAGES.about.title,
                                    url: `${SITE.domain}${PAGES.about.path}`,
                                    mainEntity: {
                                        "@type": "Person",
                                        name: "Usama Aslam",
                                        jobTitle: "MERN Stack Developer",
                                        description: PAGES.about.description,
                                        url: SITE.domain,
                                    },
                                })}
                            </script>
            </Helmet>

            <div className="bg-[url('https://interwood.pk/cdn/shop/files/Voyage1.webp?v=1753964549')] bg-cover bg-center bg-no-repeat h-[350px] w-full flex items-center justify-center">
                <h1 className='text-6xl text-white justify-center text-center'>Who We Are</h1>
            </div>

            {/* About Content */}
            <div className="flex flex-col md:flex-row justify-center items-start text-center md:text-left px-4 py-8">
                {/* Text Section */}
                <div className="w-full md:w-1/2 px-4 md:px-8 mb-8 md:mb-0">
                    <h2 className="text-4xl font-bold leading-snug text-center md:text-left">
                        Dedicated Software Development Services Tailored to Your Needs
                    </h2>

                    <p className="text-base leading-relaxed text-slate-600 mt-4">
                        At Usama Aslam, we specialize in creating innovative mobile applications and websites that help businesses thrive in a digital world. With expertise in frameworks like Flutter, MEAN, MERN, and WordPress, we provide solutions that perfectly align with client objectives and user needs.
                        <br /><br />
                        Our commitment to quality and customer satisfaction sets us apart, ensuring every project we undertake is delivered on time and to the highest standards.
                    </p>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 px-4 md:px-8">
                    <img
                        src="https://bairesdev.mo.cloudinary.net/blog/2023/09/How-Many-Web-Developers-in-the-World-1.jpg?tx=w_1920,q_auto"
                        alt="Web Development Banner"
                        className="w-full h-auto object-cover rounded-md shadow-lg"
                    />
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className='flex flex-col text-center justify-center bg-slate-100 items-center'>
                <div className="px-4 py-6">
                    <h3 className='text-3xl text-blue-950 font-bold mt-2'>Why Choose Us</h3>
                    <p className='text-slate-600 max-w-xl mx-auto justify-center items-center te'>
                        Discover the unique advantages that make Usama Aslam the ideal partner for your software development journey.
                    </p>
                </div>

                <div className="flex flex-col min-[767px]:flex-row gap-6 px-4 py-8 justify-center items-center">
                    <div className="w-full min-[767px]:w-1/3 m-2">
                        <h3 className="text-2xl font-semibold text-blue-950 mt-2">💡 Expertise</h3>
                        <p className='text-slate-600'>
                            Our team consists of highly skilled developers with extensive experience across various technologies and frameworks.
                        </p>
                    </div>

                    <div className="w-full min-[767px]:w-1/3 m-2">
                        <h3 className="text-2xl font-semibold text-blue-950 mt-2">🛠️ Customization</h3>
                        <p className='text-slate-600'>
                            We believe in tailoring each project to meet the specific needs and vision of our clients, ensuring satisfaction.
                        </p>
                    </div>

                    <div className="w-full min-[767px]:w-1/3 m-2">
                        <h3 className="text-2xl font-semibold text-blue-950 mt-2">🤝 Support</h3>
                        <p className='text-slate-600'>
                            We provide ongoing support and maintenance, ensuring your applications and websites continue to perform at their best.
                        </p>
                    </div>
                </div>
                <div className="bg-[url('https://interwood.pk/cdn/shop/files/Voyage1.webp?v=1753964549')] bg-cover bg-center bg-no-repeat h-[350px] w-full flex items-center justify-center">
                    <div className=' text-white justify-center text-center'>
                        <h2 className='text-4xl font-bold m-3'>Ready to Transform?</h2>
                        <p className='m-3'>Contact us today to discuss your project and discover how we can help you achieve your goals.</p>
                        <button onClick={() => navigate("/contact")} className="px-4 py-1 mt-2 md:mt-0 rounded bg-white text-black hover:bg-blue-700 transition">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
