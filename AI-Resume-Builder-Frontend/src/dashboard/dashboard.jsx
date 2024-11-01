  import React, { useEffect, useState } from 'react'
  import AddResume from './components/AddResume.jsx'
  import { useUser } from '@clerk/clerk-react'
  import GlobalAPI from '../../service/GlobalAPI.js';
  import ResumeItem from './components/ResumeItem.jsx';

  function Dashboard() {
    
    const { user, isLoaded, isSignedIn } = useUser();
    const [resumeList, setResumeList] = useState([]);


    useEffect(() => {
      if (isLoaded && isSignedIn) {
        getResumeList();
      }
    }, [isLoaded, isSignedIn, user]);

    const getResumeList = () => {
      const email = user?.primaryEmailAddress?.emailAddress
      console.log("Email address:", email);
    
      GlobalAPI.getUserResumes(email)
        .then(resp => {
          console.log("resp.data.data", resp)
          setResumeList(resp.data)
        })
        .catch(error => {
          console.error("Error fetching resumes:", error);
        });
    };
    

    return (
      <div className='p-10 md:px-20 lg:px-32'>
        <h2 className='font-bold text-3xl'>My Resume</h2>
        <p>Start Creating AI Resume for your next Job Role</p>
        <div className='grid col-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
          <AddResume/>
          {resumeList.length > 0 && resumeList.map((resume, index) => (
            <ResumeItem resume={resume} key={index} />
          ))}
        </div>
      </div>
    );
  }

  export default Dashboard
