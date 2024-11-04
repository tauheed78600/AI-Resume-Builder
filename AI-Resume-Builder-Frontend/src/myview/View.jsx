import {React, useState, useEffect} from 'react'
import Header from '../components/custom/header'
import { Button } from '../components/ui/button'
import { RWebShare } from 'react-web-share'
import {resumeInfoContext} from '../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import ResumePreview from '../dashboard/resume/components/ResumePreview'
import GlobalAPI from '../../service/GlobalAPI'

function ViewResume() {

  const [resumeInfo,setResumeInfo]=useState();
  const {resumeid}=useParams();

  const handleDownload=()=>{
    window.print();
  }

      useEffect(()=>{
        GetResumeInfo();
    },[])
    const GetResumeInfo=()=>{
      GlobalAPI.getResumeData(resumeid).then(resp=>{
            console.log(resp.data);
            setResumeInfo(resp.data);
        })
    }

  return (
    <resumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
        <div id="no-print">
        <Header/>

        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
            <h2 className='text-center text-2xl font-medium'>
                Congrats! Your Ultimate AI generated Resume is ready ! </h2>
                <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique 
                    resume url with your friends and family </p>
            <div className='flex justify-between px-40 my-10'>
                <Button onClick={handleDownload}>Download</Button>
               
                <RWebShare
        data={{
          text: "Hello Everyone, This is my resume please open url to see it",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeid+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
        }}
        onClick={() => console.log("shared successfully!")}
      > <Button>Share</Button>
        </RWebShare>
            </div>
        </div>
            
        </div>
        <div className='my-10 mx-auto max-w-3xl'>
          <div id="print-area">
              <ResumePreview />
          </div>
      </div>

    </resumeInfoContext.Provider>
  )
}

export default ViewResume
