import { UserButton } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/custom/header';
import GlobalAPI from '../../service/GlobalAPI';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleATSRoute = () => {
    navigate('/my-resume/ats-scanner')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    GlobalAPI.sendMessage(formData)
      .then((res) => {
        setLoading(false);
        toast('Message Sent');
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Error sending message!');
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-100 via-white to-indigo-50">
      <Header />
      <div className="mx-auto px-6 lg:px-32">
        {/* Hero Section */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* <h1 className="text-5xl font-extrabold text-gray-900 leading-snug drop-shadow-md">
              Welcome to <span className="text-indigo-600">Resumatic</span>
            </h1> */}
            <blockquote className='flex flex-col justify-center text-8xl'>Dare to <span className="text-indigo-600 leading-snug drop-shadow-md font-extrabold">Dream,</span> Build to <span className="text-indigo-600 leading-snug drop-shadow-md font-extrabold">Achieve.</span></blockquote>
            <p className="text-lg text-gray-700 mt-6 leading-relaxed">
              Transform Your Professional Profile with Our Cutting-Edge AI Resume Creator. Craft a Compelling Narrative of Your Skills and Experience, Tailored to Your Dream Job. Start Building Your Dream Resume Today!
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg mt-6 hover:bg-indigo-700 transition-all duration-300"
            >
              Get Started
            </motion.button>
          </motion.div>
          <motion.img
            src="homeImage.png"
            alt="Home Illustration"
            className="rounded-lg shadow-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <section className='my-16'>
          <div className='grid grid-cols-2'>
            <div>
              <h2 className='text-7xl'><span className='text-indigo-600 leading-snug drop-shadow-md font-extrabold'>Revolutionize</span> Your Job Search with <span className='text-indigo-600 leading-snug drop-shadow-md font-extrabold'>AI-Powered</span> Precision.</h2>
            </div>
            <div className='mt-6 text-xl'>
              <p>
                Elevate your career with our cutting-edge AI-powered resume builder Resumatic. Craft stunning, professional resumes tailored to each job application, ensuring you always make a strong first impression. Our intuitive platform simplifies the resume-building process, saving you time and effort. With just a few clicks, you can create a personalized resume that showcases your unique skills and experiences.
              </p>
              <p className='mt-7'>Our AI-driven technology analyzes your information and generates impactful resumes that highlight your strengths and achievements. No more generic templates or endless formatting. Our platform empowers you to build a compelling narrative that captures the attention of recruiters. Join the thousands of job seekers who have already trusted us to help them land their dream jobs.</p>
            </div>
          </div>
        </section>

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

        {/* How It Works Section */}
        <section className="my-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="relative space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-1/2 order-2 md:order-1">
                <img
                  src="createAccount.png"
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
                  src="fillDetails.png"
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
                  src="resume.png"
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


        <section className="my-16 bg-gray-50 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Our Most Advanced ATS Checker
            </h2>
            <p className="text-center text-lg text-gray-600 mb-16">
              Ensure your resume passes ATS systems with ease. Get instant feedback,
              keyword suggestions, and a detailed ATS compliance score.
            </p>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Image Section */}
              <div
                className="relative flex justify-center items-center overflow-hidden"
                data-aos="fade-right"
              >
                <img
                  src="ATS.png"
                  alt="ATS Checker illustration"
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900 opacity-0 hover:opacity-70 transition-opacity duration-500 rounded-lg"></div>
              </div>

              {/* Description & Button Section */}
              <div
                className="flex flex-col justify-center items-start"
                data-aos="fade-left"
              >
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                  Optimize Your Resume for Success
                </h3>
                <p className="text-lg text-gray-600 mb-6">
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

          {/* Optional Animations */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-indigo-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-400 rounded-full animate-pulse"></div>
        </section>



        {/* Features Section */}
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
                    Customizable Templates
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





        <Footer />
      </div>
    </div>
  );
}

export default Home;
