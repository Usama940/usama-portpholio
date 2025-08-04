import React from 'react';

export default function Footer() {
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
                        <li className=' hover:text-green-500'> <a href="http://">Mobile Apps</a></li>
                        <li className=' hover:text-green-500'><a href="http://">Web Development</a></li>
                        <li className=' hover:text-green-500'><a href="http://">Portfolio Display</a></li>
                    </ul>
                </div>

                <div className="md:w-1/3">
                    <h2 className="text-xl font-bold text-blue-950 mb-2">Contact Info</h2>
                    <ul className="space-y-1">
                        <li>📞 03177725284</li>
                        <li>📍 Okara, Pakistan</li>
                    </ul>
                </div>
            </div>

            <div className="mt-6 border-t pt-4 text-center text-gray-600 text-xs">
                © {new Date().getFullYear()} Usama Aslam. All rights reserved.
            </div>
        </footer>
    );
}
