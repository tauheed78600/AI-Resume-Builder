import { UserButton } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/custom/header';
import GlobalAPI from '../../service/GlobalAPI';
import { toast } from 'sonner';
import { ArrowUpAZ, LoaderCircle } from 'lucide-react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Home1 from './components/home1';
import Home2 from './components/Home2';
import Home3 from './components/Home3';
import Home4 from './components/Home4';
import Home5 from './components/Home5';
import Features from './components/Features';

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  }

  const images = [
    'resume1.jpg',
    'resume2.jpg',
    'resume3.jpg',
    'resume4.jpg',
    'resume5.jpg',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-100 via-white to-indigo-50">
      <Header />
      <div className="mx-auto px-6 lg:px-32">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold text-gray-900 leading-snug drop-shadow-md">
              Welcome to <span className="text-indigo-600">Resumatic</span>
            </h1>
            <blockquote className='flex flex-col justify-center text-8xl'>Dare to <span className="text-indigo-600 leading-snug drop-shadow-md font-extrabold">Dream,</span> Build to <span className="text-indigo-600 leading-snug drop-shadow-md font-extrabold">Achieve.</span></blockquote>
            <p className="text-lg text-gray-700 mt-6 leading-relaxed">
              Transform Your Professional Profile with Our Cutting-Edge AI Resume Creator. Craft a Compelling Narrative of Your Skills and Experience, Tailored to Your Dream Job. Start Building Your Dream Resume Today!
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-left text-white font-semibold px-8 py-4 rounded-lg w-[300px] h-[70px] shadow-lg mt-6 hover:bg-indigo-700 transition-all duration-300"
            >
              <div className='flex flex-row justify-between'>
              <p className='text-2xl font-extrabold'>Get Started</p>
              <ArrowUpRight/>
              </div>
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
        <Home1/>
        <Home2/>
        <Home3/>
        </div>
        
        <Home5/>
        <div className="mx-auto px-6 lg:px-32">
        <Home4/>
        <Features/>
        </div>
        <Footer />
        
      </div>
  );
}

export default Home;
