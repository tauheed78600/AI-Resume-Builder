import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

function Footer() {
  return (
    <div className="bg-violet-900 text-white py-12"
      style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
      <div className="container mx-auto px-6 lg:px-16">
        <div className='flex justify-between'>
          <div className="mb-8">
            <h3 className="text-3xl font-semibold mb-2">Do you have any feedback for us?</h3>
            <p className="text-xl ">We’d love to hear your thoughts and improve our platform.</p>
          </div>
          <div className='relative'>
            <input
              className="bg-transparent border border-white w-[750px] h-[100px] text-2xl rounded-xl p-4 pr-12 text-white placeholder:text-white placeholder:text-2xl"
              placeholder="Enter Your Feedback here"
            />
            <button className="absolute right-9 mt-9 text-white">
              <Send className='h-9 w-9' />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-2">About Resumatic</h3>
          <p className="text-lg flex-wrap">
            Resumatic is your one-stop solution for building professional resumes, <br />
            cover letters, and other career tools with AI-powered precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-md font-bold mb-4">Career Tools</h4>
            <ul className="space-y-2">
              <li>Resume Builder</li>
              <li>Cover Letter</li>
              <li>One-Click Website</li>
              <li>Job Tracker</li>
              <li>Email Signature</li>
              <li>Pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-bold mb-4">Templates</h4>
            <ul className="space-y-2">
              <li>Resume Templates</li>
              <li>Cover Letter Templates</li>
              <li>Website Templates</li>
              <li>Email Signature Templates</li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-bold mb-4">Tell Your Friends About Us</h4>
            <div className="flex space-x-4">
              <Facebook className="cursor-pointer hover:text-indigo-400" />
              <Twitter className="cursor-pointer hover:text-indigo-400" />
              <Instagram className="cursor-pointer hover:text-indigo-400" />
              <Linkedin className="cursor-pointer hover:text-indigo-400" />
            </div>
          </div>
        </div>
      </div>


      <hr/>
      <div className='h-[10px]'>
        <div className='flex justify-between'>
        <p className="text-center ml-4 mt-4">© 2021 Resumatic. All rights reserved.</p>
        <img onClick={() =>{window.location.reload()}} className='cursor-pointer' src="/AIResLogo.png" width={270} height={100} alt="AIRes Logo" />
        <p className="text-center mr-4 mt-4">Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
