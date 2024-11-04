import { UserButton } from '@clerk/clerk-react';
import React from 'react';
import Header from '../components/custom/header';

function Home() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Header />
      <div className="mx-auto px-6 lg:px-32 py-12">
        
        <section className="text-center my-16 space-y-6 animate-fade-in">
          <h1 className="text-4xl font-bold drop-shadow-lg animate-slide-in-down">
            Welcome to <span className="text-indigo-600">AI Resume Builder</span>
          </h1>
          <p className="text-lg max-w-lg mx-auto opacity-90 animate-slide-in-up">
            Build your professional resume with the power of AI. Easy, fast, and effective!
          </p>
          <div className="animate-pulse">
            <button className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-full shadow-md hover:shadow-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105">
              Get Started
            </button>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="my-16 space-y-8">
          <h2 className="text-3xl font-semibold text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition duration-300">
              <h3 className="text-2xl font-bold mb-4">1. Create an Account</h3>
              <p className="text-sm">Sign up and log in to get started.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition duration-300">
              <h3 className="text-2xl font-bold mb-4">2. Fill Your Details</h3>
              <p className="text-sm">Provide your personal and professional information.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition duration-300">
              <h3 className="text-2xl font-bold mb-4">3. Download Resume</h3>
              <p className="text-sm">Generate a polished resume and download it instantly.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="my-16 space-y-8">
          <h2 className="text-3xl font-semibold text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition duration-300">
              <h3 className="text-2xl font-bold mb-4">AI-Powered Resume Creation</h3>
              <p className="text-sm">Automatically generate professional resumes tailored to your profile.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition duration-300">
              <h3 className="text-2xl font-bold mb-4">Customizable Templates</h3>
              <p className="text-sm">Choose from a variety of sleek, modern, and industry-specific templates.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition duration-300">
              <h3 className="text-2xl font-bold mb-4">Real-Time Suggestions</h3>
              <p className="text-sm">Receive AI-driven tips to improve the quality of your resume.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition duration-300">
              <h3 className="text-2xl font-bold mb-4">Easy Editing</h3>
              <p className="text-sm">Effortlessly update and modify your resume as needed.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition duration-300">
              <h3 className="text-2xl font-bold mb-4">Export to PDF</h3>
              <p className="text-sm">Download your resume in high-quality PDF format.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition duration-300">
              <h3 className="text-2xl font-bold mb-4">Built-In Job Search</h3>
              <p className="text-sm">Find relevant job postings directly from the platform.</p>
            </div>
          </div>
        </section>

        {/* User Reviews Section */}
        <section className="my-16">
          <h2 className="text-3xl font-semibold text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition duration-300">
              <p className="text-lg mb-4">"The AI suggestions were spot-on and really helped me fine-tune my resume!"</p>
              <h4 className="font-bold">- John D.</h4>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition duration-300">
              <p className="text-lg mb-4">"I got my dream job thanks to this platform. Highly recommended!"</p>
              <h4 className="font-bold">- Sarah P.</h4>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition duration-300">
              <p className="text-lg mb-4">"Easy to use and the templates are fantastic!"</p>
              <h4 className="font-bold">- Emily W.</h4>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition duration-300">
              <p className="text-lg mb-4">"The AI really took the guesswork out of building my resume."</p>
              <h4 className="font-bold">- Mike T.</h4>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition duration-300">
              <p className="text-lg mb-4">"I landed an interview within a week of using this!"</p>
              <h4 className="font-bold">- Jessica A.</h4>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition duration-300">
              <p className="text-lg mb-4">"Excellent tool for anyone looking to stand out in the job market."</p>
              <h4 className="font-bold">- Brian L.</h4>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="my-16 text-center">
          <h2 className="text-3xl font-semibold mb-8">Contact Us</h2>
          <form className="max-w-lg mx-auto space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none"
              rows="4"
            />
            <button className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105">
              Submit
            </button>
          </form>
        </section>

        <div className="fixed top-4 right-4">
          {/* <UserButton /> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
