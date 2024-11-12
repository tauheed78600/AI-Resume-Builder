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
    links: [],
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
      <div className="flex justify-center font-bold text-4xl italic mb-5">
        {resumeInfo?.title}
      </div>

      <div className="flex justify-between grid-cols-2 gap-4 px-5">
      <div className="col-span-2 w-full max-w-4xl">
          <FormSection />
        </div>

        {/* Resume Preview with reduced gap */}
        <div className="col-span-1">
          {selectedTemplate ? selectedTemplate.component : <ResumePreview />}
        </div>
      </div>
    </resumeInfoContext.Provider>
  );
}

export default EditResume;
