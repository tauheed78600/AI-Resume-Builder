import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <div className="bg-violet-600 text-white py-12"
      style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
      <div className="container mx-auto px-6 lg:px-16">
        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-2">Do you have any feedback for us?</h3>
          <p className="text-xl ">We’d love to hear your thoughts and improve our platform.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-2">About Resumatic</h3>
          <p className="text-lg flex-wrap">
            Resumatic is your one-stop solution for building professional resumes, <br/>
            cover letters, and other career tools with AI-powered precision.
          </p>
        </div>

        {/* Footer Menus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Career Tools Menu */}
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

          {/* Social Media Section */}
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

      {/* Footer Bottom */}
      <div className="border-t border-white-700 pt-4 container mx-auto px-6 lg:px-16 flex flex-col md:flex-row justify-between text-sm">
        <p>&copy; 2024 Resumatic</p>
        <div className="text-white flex gap-2">
          <a href="#" className="">Contact</a>
          <a href="#" className="">Terms of Service</a>
          <a href="#" className="">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
