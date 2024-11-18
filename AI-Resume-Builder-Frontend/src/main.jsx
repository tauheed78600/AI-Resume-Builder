import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signin from './auth/signin/signin.jsx';
import Home from './Home/home.jsx';
import Dashboard from './dashboard/dashboard.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import EditResume from './dashboard/resume/[resumeid]/edit/index.jsx';
import { useState, useEffect } from 'react';
import GlobalAPI from '../service/GlobalAPI.js';
import { useUser } from '@clerk/clerk-react';
import ViewResume from './myview/View.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const Main = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [resumeList, setResumeList] = useState([]);

  const getResumeList = () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    console.log("Email address:", email);
    GlobalAPI.getUserResumes(email)
      .then(resp => {
        console.log("first me in main jsx");
        console.log("resp.data.data", resp);
        setResumeList(resp.data);
      })
      .catch(error => {
        console.error("Error fetching resumes:", error);
      });
  };
  

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      getResumeList();
    }
  }, [isLoaded, isSignedIn, user]);

  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard resumeList={resumeList} /> 
        },
        {
          path: '/dashboard/resume/:resumeid/edit',
          element: <EditResume resumeList={resumeList} />
        }
      ]
    },
    {
      path: '/auth/signin',
      element: <Signin />
    },
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/my-resume/:resumeid/view',
      element: <ViewResume/>
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Main />
    </ClerkProvider>
  </StrictMode>,
);