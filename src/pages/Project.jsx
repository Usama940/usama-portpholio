import React from 'react';
import { Helmet } from "react-helmet-async";
import { PAGES, SITE } from "../seo/meta.js";
import weather from '../assets/weather.jpg';
import Iresonate from '../assets/Iresonate.jpg';
import firstProject from '../assets/firstProject.jpg';
import ndProject from '../assets/ndProject.jpg';


const projectImages = [
    { src: weather, alt: "A weather-related project" },
    { src: Iresonate, alt: "Iresonate project" },
    { src: firstProject, alt: "First project" },
    { src: ndProject, alt: "Second project" },
    {
        src: "https://media.istockphoto.com/id/1019917456/vector/front-end-development.jpg?s=612x612&w=0&k=20&c=zbHEmcJK5HjPDMMjzbd9gp0AaKDk9c9xnHPMYmIWsz4=",
        alt: "Frontend development illustration"
    }
];

export default function Project() {
    return (
                <>
                <Helmet>
                    <title>{PAGES.projects.title}</title>
                    <meta name="description" content={PAGES.projects.description} />
                    <meta name="keywords" content={PAGES.projects.keywords} />
                    <link rel="canonical" href={`${SITE.domain}${PAGES.projects.path}`} />
                                        <meta property="og:title" content={PAGES.projects.title} />
                                        <meta property="og:description" content={PAGES.projects.description} />
                                        <meta property="og:type" content="website" />
                                        <meta property="og:url" content={`${SITE.domain}${PAGES.projects.path}`} />
                                        <meta property="og:site_name" content="Usama Aslam Portfolio" />
                                        <meta property="og:locale" content="en_US" />
                                        <meta property="og:image" content={`${SITE.domain}${PAGES.projects.image}`} />
                                        <meta property="og:image:width" content="1200" />
                                        <meta property="og:image:height" content="630" />
                                        <meta name="twitter:card" content="summary_large_image" />
                                        <meta name="twitter:title" content={PAGES.projects.title} />
                                        <meta name="twitter:description" content={PAGES.projects.description} />
                                        <meta name="twitter:image" content={`${SITE.domain}${PAGES.projects.image}`} />
                                        <meta name="twitter:image:alt" content="Projects by Usama Aslam" />
                                        <script type="application/ld+json">
                                            {JSON.stringify({
                                                "@context": "https://schema.org",
                                                "@type": "ItemList",
                                                name: PAGES.projects.title,
                                                url: `${SITE.domain}${PAGES.projects.path}`,
                                                itemListElement: [
                                                    {
                                                        "@type": "ListItem",
                                                        position: 1,
                                                        name: "Weather Project",
                                                    },
                                                    {
                                                        "@type": "ListItem",
                                                        position: 2,
                                                        name: "Iresonate Project",
                                                    },
                                                    {
                                                        "@type": "ListItem",
                                                        position: 3,
                                                        name: "First Project",
                                                    },
                                                    {
                                                        "@type": "ListItem",
                                                        position: 4,
                                                        name: "Second Project",
                                                    },
                                                ],
                                            })}
                                        </script>
                </Helmet>

                <div className="flex flex-wrap justify-center gap-6 p-6 mt-20">
                    <h1 className="w-full text-3xl font-bold text-center mb-6">Projects by Usama Aslam</h1>
            {projectImages.map((image, index) => (
                <div
                    key={index}
                    className="flex-shrink-0 w-full sm:w-[45%] md:w-[30%] aspect-[4/3] bg-white rounded-lg shadow-xl shadow-gray-500/50 overflow-hidden hover:scale-105 transition-transform duration-200"
                >
                    <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-contain"
                    />
                </div>
            ))}
        </div>
        </>
    );
}

