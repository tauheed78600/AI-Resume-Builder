import React, { useContext } from 'react';
import { resumeInfoContext } from '../../../../../context/ResumeInfoContext';
import moment from 'moment';

function FreshSingle() {
  const { resumeInfo } = useContext(resumeInfoContext);

  const themeColor =  '#2C3E50'; // Dark blue theme color
  const secondaryColor = '#7F8C8D'; // Gray color for dividers

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200" style={{ fontFamily: 'Arial, sans-serif', width: '800px', color: secondaryColor }}>
      {/* Header Section */}
      <div className="text-center mb-3 border-b-4 pb-2" style={{ borderColor: themeColor }}>
        <h1 className="text-lg font-bold">{resumeInfo?.firstName || "Jane"} {resumeInfo?.lastName || "Doe"}</h1>
        <h2 className="text-sm font-semibold">{resumeInfo?.jobTitle || "Frontend Developer"}</h2>
        <p className="text-xs">{resumeInfo?.email || "janedoe@example.com"} | {resumeInfo?.number || "+123456789"}</p>
      </div>

      {/* Summary Section */}
      <section className="mb-4">
        <h2 className="text-sm font-bold" style={{ color: themeColor }}>Summary</h2>
        <p className="text-xs" style={{ color: themeColor }}>
          {resumeInfo?.summary || "Passionate Frontend Developer with 5+ years of experience in building responsive web applications using React, HTML, and CSS. Focused on creating seamless user experiences."}
        </p>
      </section>

      <hr className="my-2" style={{ borderColor: secondaryColor }} />

      {/* Experience Section */}
      <section className="mb-4">
        <h2 className="text-sm font-bold" style={{ color: themeColor }}>Experience</h2>
        {resumeInfo?.experience.map((exp, idx) => (
          <div key={idx} className="mb-3">
            <h3 className="text-sm font-semibold">{exp.title} at {exp.companyName}</h3>
            <p className="text-xs text-gray-600">{moment(exp.startDate).format("MMM YYYY")} - {moment(exp.endDate).format("MMM YYYY")}</p>
            <p className="text-xs">{exp.city}, {exp.state}</p>
            <p className="text-xs mt-1" dangerouslySetInnerHTML={{ __html: exp.summary }} />
          </div>
        )) || (
          <div className="text-xs">
            <p className="font-semibold">UI Developer</p>
            <p>ABC Solutions</p>
            <p>2020 - Present</p>
            <p>Implemented dynamic UIs and optimized web performance using React.</p>
          </div>
        )}
      </section>

      <hr className="my-2" style={{ borderColor: secondaryColor }} />

      {/* Skills Section */}
      <section className="mb-4">
        <h2 className="text-sm font-bold" style={{ color: themeColor }}>Skills</h2>
        <ul className="text-xs">
          {resumeInfo?.skills.map((skill, idx) => (
            <li key={idx} className="py-1">{skill.skill}</li>
          )) || (
            <>
              <li>React</li>
              <li>JavaScript</li>
              <li>HTML/CSS</li>
              <li>API Integration</li>
            </>
          )}
        </ul>
      </section>

      <hr className="my-2" style={{ borderColor: secondaryColor }} />

      {/* Education Section */}
      <section className="mb-4">
        <h2 className="text-sm font-bold" style={{ color: themeColor }}>Education</h2>
        {resumeInfo?.education.map((edu, idx) => (
          <div key={idx} className="mb-2">
            <p className="text-xs font-semibold">{edu.degree} - {edu.universityName}</p>
            <p className="text-xs text-gray-600">{moment(edu.startDate).format("MMM YYYY")} - {moment(edu.endDate).format("MMM YYYY")}</p>
            <p className="text-xs">{edu.city}, {edu.state}</p>
            <p className="text-xs">{edu.description}</p>
          </div>
        )) || (
          <div>
            <p className="text-xs font-semibold">M.Sc. in Computer Science</p>
            <p>University of XYZ</p>
            <p>2017 - 2019</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default FreshSingle;
