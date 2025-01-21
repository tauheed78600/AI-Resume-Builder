import React from 'react'

function Features() {
  return (
    <section className="my-16 bg-gray-50 py-12">
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Features</h2>
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Feature 1 */}
        <div className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-600 text-white rounded-full">
              <i className="fas fa-robot text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              AI-Powered Resume Creation
            </h3>
          </div>
          <p className="mt-4 text-gray-600">
            Generate professional resumes tailored to your profile using AI.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-500 text-white rounded-full">
              <i className="fas fa-pencil-alt text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Customizable s
            </h3>
          </div>
          <p className="mt-4 text-gray-600">
            Choose from industry-specific templates that match your style.
          </p>
        </div>

        <div className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-orange-500 text-white rounded-full">
              <i className="fas fa-pencil-alt text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Real-Time Suggestions
            </h3>
          </div>
          <p className="mt-4 text-gray-600">
            Improve your resume quality with AI-powered tips and feedback.
          </p>
        </div>


        <div className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-red-500 text-white rounded-full">
              <i className="fas fa-pencil-alt text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              ATS Tracking
            </h3>
          </div>
          <p className="mt-4 text-gray-600">
            Improve your resume quality our most powerful ATS Tracking System and many other additional Features
          </p>
        </div>



        {/* Feature 4 */}
        <div className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-500 text-white rounded-full">
              <i className="fas fa-file-pdf text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Export to PDF
            </h3>
          </div>
          <p className="mt-4 text-gray-600">
            Download your resume in a high-quality PDF format.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-yellow-500 text-white rounded-full">
              <i className="fas fa-search text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Built-In Job Search
            </h3>
          </div>
          <p className="mt-4 text-gray-600">
            Discover job opportunities directly from the platform.
          </p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Features
