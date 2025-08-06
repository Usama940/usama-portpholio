import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import ContactForm from './ContactForm';

export default function Contact() {
    return (
        <div className='bg-[rgb(237,251,226)] min-h-screen py-16'>

            {/* Hero Section (Optional) */}
            <div className="relative h-80 w-full overflow-hidden mb-12">
                <div className="absolute inset-0 bg-[url('https://interwood.pk/cdn/shop/files/Voyage1.webp?v=1753964549')] bg-cover bg-center blur-sm"></div>
                <div className="relative h-full flex items-center justify-center">
                    <h2 className="text-white text-5xl font-bold z-10">Get in Touch</h2>
                </div>
            </div>

            {/* Main Flex Layout */}
            <div className='flex flex-col md:flex-row justify-center items-center gap-16 px-6 md:px-20'>

                {/* Left Column: Text Info */}
                <div className='w-full md:w-1/2 flex flex-col justify-center'>

                    <h2 className='font-bold text-blue-950 text-4xl mb-8 text-center md:text-left'>Reach Out Today</h2>

                    {/* Phone Section */}
                    <div className='mb-6'>
                        <h3 className='text-lg font-semibold text-blue-900 mb-1 text-center md:text-left tracking-wide'>Phone</h3>
                        <p className='hover:text-black hover:text-2xl text-gray-700 text-center md:text-left'>03177725284</p>
                    </div>

                    {/* Email Section */}
                    <div className='mb-6'>
                        <h3 className='text-lg font-semibold text-blue-900 mb-1 text-center md:text-left tracking-wide'>Email</h3>
                        <p className='hover:text-black hover:text-2xl text-gray-700 text-center md:text-left'>Usama24.2r@gmail.com</p>
                    </div>

                    {/* Social Icons */}
                    <div className='mb-6'>
                        <h3 className='text-lg font-semibold text-blue-900 mb-2 text-center md:text-left tracking-wide'>Follow Us</h3>
                        <ul className='flex gap-4 justify-center md:justify-start text-2xl'>
                            <li className="hover:text-green-600 transition-colors duration-200">
                                <a href="https://wa.me/923177725284" target="_blank" rel="noopener noreferrer">
                                    <IoLogoWhatsapp />
                                </a>
                            </li>
                            <li className="hover:text-blue-600 transition-colors duration-200">
                                <a href="https://www.facebook.com/share/1YXWeEdnpm/" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook />
                                </a>
                            </li>
                            <li className="hover:text-pink-600 transition-colors duration-200">
                                <a href="https://www.instagram.com/chusamasangoka/profilecard/?igsh=YTUxZTdpN2RrdTd0" target="_blank" rel="noopener noreferrer">
                                    <FaSquareInstagram />
                                </a>
                            </li>
                            <li className="hover:text-blue-600 transition-colors duration-200">
                                <a href="https://www.linkedin.com/in/usamaaslam-pakistan?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin />
                                </a>
                            </li>
                            <li className="hover:text-red-600 transition-colors duration-200">
                                <a href="https://www.youtube.com/@mominraza0" target="_blank" rel="noopener noreferrer">
                                    <FaYoutube />
                                </a>
                            </li>
                        </ul>

                    </div>

                </div>


                <div className='w-full md:w-1/2 flex justify-center items-center'>
                    <ContactForm />
                </div>

            </div>
        </div>
    );
}
