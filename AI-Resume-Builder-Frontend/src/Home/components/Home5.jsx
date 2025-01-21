import React from 'react'

function Home5() {

    const handleATSRoute = () => {
        navigate('/my-resume/ats-scanner')
      }


  return (
    <div className="my-16 bg-gray-50 py-12 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 object-cover w-full h-[560px]"
    >
          <div className="container mx-auto px-6">
            <h2 className="text-6xl font-bold text-center  mb-4">
              Our Most Advanced ATS Checker
            </h2>
            <p className="text-center text-xl text-white mb-2">
              Ensure your resume passes ATS systems with ease. Get instant feedback,
              keyword suggestions, and a detailed ATS compliance score.
            </p>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div
                className="relative flex justify-center items-center overflow-hidden"
              >
                <img
                  src="ATS.png"
                  alt="ATS Checker illustration"
                  className="rounded-lg shadow-lg "
                />
              </div>

              <div
                className="flex flex-col justify-center items-start p-4"
              >
                <h3 className="text-3xl font-semibold text-white mb-4">
                  Optimize Your Resume for Success
                </h3>
                <p className="text-lg text-white mb-6">
                  Upload your resume and get an in-depth analysis of its ATS compliance.
                  Discover areas for improvement, match job descriptions with precision,
                  and take the first step towards landing your dream job.
                </p>
                <button onClick={handleATSRoute} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Check Your Resume Now
                </button>
              </div>
            </div>
          </div>

          <div className="absolute top-0 left-0 w-16 h-16 bg-indigo-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-400 rounded-full animate-pulse"></div>
        </div>
  )
}

export default Home5
