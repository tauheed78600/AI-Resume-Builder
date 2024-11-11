import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { resumeInfoContext } from '../../../../context/ResumeInfoContext';
import GlobalAPI from '../../../../../service/GlobalAPI';
import resumeTemplates from '../../components/preview/templates';

function EditResume({ resumeList }) {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    userEmail: '',
    email: '',
    number: '',
    summary: '',
    themeColor: '#000000',
    username: '',
    jobTitle: '',
    skills: [],
    education: [],
    experience: [],
    projects: [],
    templateId: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resumeId = parseInt(params?.resumeid);
    const foundResume = resumeList.find(resume => resume.userid === resumeId);
    console.log("foundResume", foundResume)
    
    if (foundResume) {
      const fetchResumeData = async () => {
        try {
          const resp = await GlobalAPI.getResumeData(foundResume.userid);
          console.log("resp in edit resume", resp);
          setResumeInfo(resp.data);
        } catch (error) {
          console.error("Error fetching resume data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchResumeData();
    } else {
      setLoading(false);
    }
  }, [resumeList, params.resumeid]);
  

  if (loading) {
    return <div>Loading...</div>;
  }



  const selectedTemplate = resumeTemplates.find(template => template.id === resumeInfo.templateId);

  return (
    <resumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="flex justify-center font-bold text-4xl italic">
        {resumeInfo?.title}
      </div>

      <div className="grid grid-cols-2 p-10 gap-10">
        <FormSection />
        {selectedTemplate ? selectedTemplate.component : <ResumePreview />}
      </div>
        </resumeInfoContext.Provider>
  );
}

export default EditResume;