import React from 'react';
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
        <div className="flex flex-wrap justify-center gap-6 p-6 mt-20">
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
    );
}

