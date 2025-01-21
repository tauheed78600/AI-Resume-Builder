import React from 'react'

function Home4() {
  return (
    <section className="my-16 px-32">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="relative space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-1/2 order-2 md:order-1">
                <img
                  src="createAccount.jpg"
                  alt="Create Account"
                  className="rounded-lg shadow-lg hover:shadow-xl transition"
                />
              </div>
              <div className="w-1/2 order-1 md:order-2 text-center md:text-left">
                <h3 className="text-3xl font-semibold text-indigo-600 mb-4">
                  Step 1: Create an Account
                </h3>
                <p className="text-gray-600">
                  Begin by signing up with your email to unlock all features. It's quick
                  and easy!
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="w-1/2">
                <img
                  src="fillDetails.jpg"
                  alt="Fill Details"
                  className="rounded-lg shadow-lg hover:shadow-xl transition"
                />
              </div>
              <div className="w-1/2 text-center md:text-right">
                <h3 className="text-3xl font-semibold text-indigo-600 mb-4">
                  Step 2: Fill Your Details
                </h3>
                <p className="text-gray-600">
                  Provide your personal and professional details to build your profile.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-1/2 order-2 md:order-1">
                <img
                  src="resume.jpg"
                  alt="Download Resume"
                  className="rounded-lg shadow-lg hover:shadow-xl transition"
                />
              </div>
              <div className="w-1/2 order-1 md:order-2 text-center md:text-left">
                <h3 className="text-3xl font-semibold text-indigo-600 mb-4">
                  Step 3: Download Your Resume
                </h3>
                <p className="text-gray-600">
                  Generate and download a polished resume instantly, tailored to your
                  needs.
                </p>
              </div>
            </div>
          </div>
        </section>
  )
}

export default Home4
