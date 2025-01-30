import React from 'react';

function Home4() {
  return (
    <section className="my-24 px-8 md:px-32">
      <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">
        How It Works
      </h2>
      <div className="relative max-w-4xl mx-auto">
        {/* Timeline */}
        <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500 transform -translate-x-1/2"></div>

        {/* Step 1 */}
        <div className="flex items-center w-full mb-16">
          <div className="w-1/2 pr-8 text-right">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Step 1: Create an Account
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Begin by signing up with your email to unlock all features. It's quick
              and easy!
            </p>
          </div>
          <div className="w-1/2 pl-8 transform transition duration-500 hover:scale-105">
            <img
              src="createAccount.jpg"
              alt="Create Account"
              className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center w-full mb-16 flex-row-reverse">
          <div className="w-1/2 pl-8 text-left">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent mb-4">
              Step 2: Fill Your Details
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Provide your personal and professional details to build your profile.
            </p>
          </div>
          <div className="w-1/2 pr-8 transform transition duration-500 hover:scale-105">
            <img
              src="fillDetails.jpg"
              alt="Fill Details"
              className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
            />
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-center w-full">
          <div className="w-1/2 pr-8 text-right">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
              Step 3: Download Your Resume
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Generate and download a polished resume instantly, tailored to your
              needs.
            </p>
          </div>
          <div className="w-1/2 pl-8 transform transition duration-500 hover:scale-105">
            <img
              src="resume.jpg"
              alt="Download Resume"
              className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home4;