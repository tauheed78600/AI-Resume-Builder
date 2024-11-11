import React, { useState, useEffect } from 'react';
import Header from '../components/custom/header';
import { Button } from '../components/ui/button';
import { resumeInfoContext } from '../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import ResumePreview from '../dashboard/resume/components/ResumePreview';
import GlobalAPI from '../../service/GlobalAPI';
import html2pdf from 'html2pdf.js';
import resumeTemplates from '../dashboard/resume/components/preview/templates';

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeid } = useParams();
  const [shareMessage, setShareMessage] = useState("");

  const handleDownload = () => {
    const element = document.getElementById('print-area');
    const options = {
      margin: 0,
      filename: `${resumeInfo?.firstName}_${resumeInfo?.lastName}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  };

  const handleShare = () => {
    const shareUrl = `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeid}/view`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setShareMessage("Link copied to clipboard!");
        setTimeout(() => setShareMessage(""), 2000);
      })
      .catch(() => setShareMessage("Failed to copy link. Please try again."));
  };

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalAPI.getResumeData(resumeid).then((resp) => {
      console.log(resp.data);
      setResumeInfo(resp.data);
    });
  };

  const reqTemplate = resumeTemplates.find(template => template.id === resumeInfo?.templateId);

  return (
    <resumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generated Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume, and you can share the unique resume URL with your friends and family.
          </p>
          <div className="flex justify-between px-40 my-10">
            <Button onClick={handleDownload}>Download</Button>
            <Button onClick={handleShare}>Copy Share Link</Button>
          </div>
          {shareMessage && (
            <p className="text-center text-green-500 mt-2">{shareMessage}</p>
          )}
        </div>
      </div>
      <div className="my-10 mx-auto max-w-3xl">
        <div id="print-area">
          {resumeInfo?.templateId?
          reqTemplate.component:
          <ResumePreview/>  
        }
        </div>
      </div>
    </resumeInfoContext.Provider>
  );
}

export default ViewResume;
