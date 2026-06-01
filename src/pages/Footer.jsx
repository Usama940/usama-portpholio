import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    // footer uses Links for navigation; no imperative navigation required
    return (
        <footer className="bg-gray-100 text-gray-800 py-8 px-4  shadow-inner">

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl mx-auto text-center md:text-center">


                <div className="md:w-1/3">
                    <h2 className="text-xl font-bold text-blue-950 mb-2 ml-3">About Us</h2>
                    <p>
                        Usama Aslam is a skilled software developer focused on creating impactful
                        mobile apps and websites tailored to meet client's needs.
                    </p>
                </div>

                <div className="md:w-1/3">
                    <h2 className="text-xl font-bold text-blue-950 mb-2">Our Services</h2>
                    <ul className="space-y-1">
                        <li className=' hover:text-blue-500'><Link to="/projects">Mobile Apps</Link></li>
                        <li className=' hover:text-blue-500'><Link to="/projects">Web Development</Link></li>
                        <li className=' hover:text-blue-500'><Link to="/projects">Portfolio Display</Link></li>
                    </ul>
                </div>

                <div className="md:w-1/3">
                    <h2 className="text-xl font-bold text-blue-950 mb-2">Free Tools</h2>
                    <ul className="space-y-1">
                        <li className="hover:text-blue-500"><Link to="/tools/pdf-compressor">PDF Compressor</Link></li>
                        <li className="hover:text-blue-500"><Link to="/tools/image-to-pdf">Image to PDF</Link></li>
                        <li className="hover:text-blue-500"><Link to="/tools/qr-code-generator">QR Code Generator</Link></li>
                        <li className="hover:text-blue-500"><Link to="/tools/json-formatter">JSON Formatter</Link></li>
                        <li className="hover:text-blue-500"><Link to="/tools/password-generator">Password Generator</Link></li>
                        <li className="hover:text-blue-500"><Link to="/tools">All Tools →</Link></li>
                    </ul>
                </div>

                <div className="md:w-1/3">
                    <h2 className="text-xl font-bold text-blue-950 mb-2">Contact Info</h2>
                    <ul className="space-y-1">
                        <li className=' hover:text-3xl '>📞 03177725284</li>
                        <li>📍 Okara, Pakistan</li>
                    </ul>
                </div>
            </div>

            <div className="mt-6 border-t pt-4 text-center text-gray-600 text-xs">
                <div className="mb-2 flex justify-center gap-4">
                    <Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-blue-600">Terms of Service</Link>
                    <Link to="/tools" className="hover:text-blue-600">Free Tools</Link>
                </div>
                © {new Date().getFullYear()} Usama Aslam. All rights reserved.
            </div>
        </footer>
    );
}
