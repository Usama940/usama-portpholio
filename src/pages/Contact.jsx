import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";


export default function Contact() {
    return (
        <div>

            <div className="relative h-86 w-full overflow-hidden">


                <div className="absolute inset-0 bg-[url('https://interwood.pk/cdn/shop/files/Voyage1.webp?v=1753964549')] bg-cover bg-center bg-no-repeat blur-sm"></div>

                <div className="relative h-full flex items-center justify-center">
                    <h2 className="text-white text-5xl font-bold">Get in Touch</h2>
                </div>

            </div>
            <div>
                <div>

                    <h2>Reach Out Today</h2>
                </div>
                <div><h1 className='text-1xl font-bold text-blue-950'>Phone</h1>
                    <h1>03177725284</h1>
                </div>
                <div>
                    <h1 className='text-1xl font-bold text-blue-950'>Email</h1>
                    <h1>Usama24.2r@gmail.com</h1>
                </div>
                <div><h1 className='text-1xl font-bold text-blue-950'>Follow Us</h1>
                    <ul className='flex '>
                        <li className="hover:text-green-600 transition-colors duration-200">
                            <a
                                href="https://wa.me/923177725284"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaWhatsapp />
                            </a>
                        </li>

                        <li className=" hover:text-blue-600 transition-colors duration-200">
                            <FaFacebook />
                        </li>

                        <li className=" hover:text-green-600 transition-colors duration-200"><FaSquareInstagram /></li>
                        <li className=" hover:text-blue-600 transition-colors duration-200"><AiFillTikTok /></li>
                        <li className=" hover:text-red-600 transition-colors duration-200"><FaYoutube /></li>
                    </ul>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
