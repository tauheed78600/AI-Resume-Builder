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

  const handleATSRoute = () =>{
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold text-gray-900 leading-snug drop-shadow-md">
              Welcome to <span className="text-indigo-600">Resumatic</span>
            </h1>
            <p className="text-lg text-gray-700 mt-6 leading-relaxed">
              Build your professional resume with the power of AI. Easy, fast, and effective! Create ATS-compliant resumes with a free ATS Resume Checker.
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



        {/* Contact Us Section */}
        <section className="my-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <motion.form
            className="max-w-lg mx-auto space-y-4 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {['name', 'email', 'message'].map((field, idx) => (
              <input
                key={idx}
                onChange={handleChange}
                name={field}
                type={field === 'message' ? 'textarea' : 'text'}
                placeholder={`Your ${field}`}
                className="w-full p-3 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-indigo-500 transition duration-200"
              />
            ))}
            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
            >
              Submit
            </motion.button>
          </motion.form>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
