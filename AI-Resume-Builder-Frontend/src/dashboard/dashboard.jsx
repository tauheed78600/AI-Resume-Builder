import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume.jsx';
import { useUser } from '@clerk/clerk-react';
import GlobalAPI from '../../service/GlobalAPI.js';
import ResumeItem from './components/ResumeItem.jsx';
import Card from './Card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Navigate, useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      getResumeList();
    }
  }, [isLoaded, isSignedIn, user]);

  const getResumeList = () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    console.log("Email address:", email);

    GlobalAPI.getUserResumes(email)
      .then(resp => {
        console.log("resp.data.data", resp);
        setResumeList(resp.data);
      })
      .catch(error => {
        console.error("Error fetching resumes:", error);
      });
  };

  return (
    <div className="p-6 md:px-12 lg:px-24">
      <div>
      <h2 className="font-bold text-2xl text-center bg-lavender-200 p-4">Welcome to Resumatic</h2>
      <h2 className="font-bold text-6xl text-center mb-6 bg-lavender-200 p-4">What do you want to create?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Card
            title="Resume"
            buttonTitle="Create"
            description="Create Beautiful resumes with our 100+ resume templates"
          />
          <Card
            title="Cover Letter"
            buttonTitle="Create"
            description="Create Beautiful Cover letters with our 100+ CV templates"
          />
          <Card
            title="Biodata"
            buttonTitle="Create"
            description="Create Beautiful Biodata with our 100+ Biodata templates"
          />
          <Card
            title="Personal Portfolio"
            buttonTitle="Create"
            description="Create Beautiful Portfolios with our 100+ portfolio templates"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6 mt-9">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-800 leading-tight">
              Check Your ATS Score
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600">
              Upload your resume and discover how optimized it is for applicant tracking systems. Improve your chances of landing your dream job!
            </p>
            <div className="mt-10">
              <Button
                className="py-3 px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
                onClick={() => navigate('/ats-checker')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>

      
      <h2 className="font-bold text-3xl mt-10">My Resume</h2>
      <p className="text-lg mb-4">Start Creating AI Resume for your next Job Role</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <AddResume />
        {resumeList.length > 0 && resumeList.map((resume, index) => (
          <ResumeItem resume={resume} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
