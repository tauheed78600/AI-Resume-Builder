import React from 'react'

function Home2() {
  return (
    <section className='my-32'>
          <div className='grid grid-cols-3'>
            <div>
              <img className='hover:scale-105 transition delay-150 duration-300 ease-in-out h-[690px] w-[390px] rounded-3xl' src='modelImage.jpg'></img>
            </div>
            <div className=''>
              <div className='hover:scale-105 transition delay-150 duration-300 ease-in-out border-4 w-[410px] h-[200px] border-blue-600 bg-blue-600 rounded-3xl hover:scale-105 transition delay-150 duration-300 ease-in-out'>
                <p className='text-gray-300 p-9 text-3xl'>Elevate Your Career with AI-Powered Precision.</p>
              </div>
              <div className='mt-4 border-4 w-[850px] h-[250px] border-blue-800 bg-blue-800 rounded-3xl hover:scale-105 transition delay-150 duration-300 ease-in-out'>
                <p className='text-gray-300 p-4 text-3xl'>Your Future, Automated. Your Success, Assured</p>
              </div>
              <div className='border-2 mt-4 h-[200px] w-[410px] rounded-3xl border-violet-600 bg-violet-600 hover:scale-105 transition delay-150 duration-300 ease-in-out'>
                <p className='text-gray-300 p-4 text-3xl text-center'>Craft Your Career, Effortlessly. Land Your Dream Job, Quickly.</p>
              </div>
            </div>
            <div className=''>
              <div className='hover:scale-105 transition delay-150 duration-300 ease-in-out border-2 h-[200px] w-[420px] rounded-3xl border-green-600 bg-green-600'>
                <p className='text-gray-300 p-4 text-3xl text-center'>Reimagine Your Resume, Redefine Your Career.</p>
              </div>
              <div className='hover:scale-105 transition delay-150 duration-300 ease-in-out border-2 h-[200px] w-[420px] mt-[280px] border-violet-800 bg-violet-800 rounded-3xl'>
                <p className='text-gray-300 p-4 text-3xl text-center'>Power Up Your Job Search with AI.</p>
              </div>
            </div>
          </div>

        </section>
  )
}

export default Home2
