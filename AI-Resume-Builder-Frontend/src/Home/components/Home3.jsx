import React from 'react'
import { Button } from '../../components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function Home3() {
  return (
    <section className=''>
          <div className='grid grid-cols-2'>
            <div>
              <h2 className='font-semibold text-7xl mt-4'><span className='text-indigo-600 leading-snug drop-shadow-md font-extrabold'>Craft</span> Your Career Story with <span className='text-indigo-600 leading-snug drop-shadow-md font-extrabold'>Resumatic’s</span> Sleek Templates.</h2>
              <p className='text-2xl mt-5 '>Our customizable templates, designed to impress, help you create stunning resumes, cover letters, and personal websites.</p>
              <div className="">
                <Button className="h-20 w-[320px] mt-7 text-3xl flex items-center justify-start gap-2">
                  <ArrowUpRight className="w-[50px] h-[50px]" />
                  See All Templates
                </Button>
              </div>
            </div>
            <div className="carousel-container">
              <Carousel
                infiniteLoop
                autoPlay
                interval={3000}
                showThumbs={false}
                showStatus={false}
                dynamicHeight={false}
              >
                <div>
                  <img src="resume1.jpg" alt="Image 1" />
                  
                </div>
                <div>
                  <img src="resume2.jpg" alt="Image 2" />

                </div>
                <div>
                  <img src="resume3.jpg" alt="Image 3" />

                </div>
                <div>
                  <img src="resume4.jpg" alt="Image 3" />

                </div>
                <div>
                  <img src="resume5.jpg" alt="Image 3" />

                </div>
                <div>
                  <img src="resume6.jpg" alt="Image 3" />

                </div>
              </Carousel>
            </div>
          </div>
        </section>
  )
}

export default Home3
