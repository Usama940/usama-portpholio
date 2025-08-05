import React, { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    return (
        <div className='w-full max-w-md p-8 bg-white rounded-xl shadow-lg'>
            <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Contact Us</h1>

            <div className="mb-4">
                <label htmlFor="name" className="block text-blue-900 font-medium mb-2">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-blue-900 font-medium mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="message" className="block text-blue-900 font-medium mb-2">Message</label>
                <textarea
                    id="message"
                    name="message"
                    placeholder="Type your message"
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition duration-300"
            >
                Submit
            </button>
        </div>
    );
}
