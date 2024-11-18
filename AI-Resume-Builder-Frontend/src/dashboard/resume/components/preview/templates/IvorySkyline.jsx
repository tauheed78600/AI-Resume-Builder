import React, { useContext } from 'react';
import { resumeInfoContext } from '../../../../../context/ResumeInfoContext';
import moment from 'moment';
import { Linkedin } from 'lucide-react';

function IvorySkyline() {
  const { resumeInfo } = useContext(resumeInfoContext);

  const themeColor = resumeInfo?.themeColor || '#1E90FF'; // Blue theme color
  const secondaryColor = '#333333'; // Dark color for text

  console.log("resumeInfo in ivorySkyline", resumeInfo)

  return (

    
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200" style={{ fontFamily: 'Arial, sans-serif', width: '800px', color: secondaryColor }}>
      <div className="border-b-4 pb-3" style={{ borderColor: themeColor }}>
        <h1 className="text-lg font-bold">{resumeInfo?.firstName || "John"} {resumeInfo?.lastName || "Doe"}</h1>
        <h2 className="text-sm font-semibold">{resumeInfo?.jobTitle || "Full Stack Developer"}</h2>
        <p className="text-xs">{resumeInfo?.address || "San Francisco, CA"}</p>
        {resumeInfo?.links.map((lin)=>(
          <div className=''>
            <a href = {lin.link}><Linkedin/></a>
          </div>
        ))}
        <div className="flex justify-between text-xs mt-2">
          <p>{resumeInfo?.email || "johndoe@example.com"}</p>
          <p>{resumeInfo?.number || "+1234567890"}</p>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="flex mt-4">
        {/* Left Column */}
        <div className="w-1/3 pr-4">
          {/* Skills Section */}
          <section className="mb-4">
            <h2 className="text-sm font-bold" style={{ color: themeColor }}>Skills</h2>
            <ul className="text-xs">
              {resumeInfo?.skills.map((skill, idx) => (
                <li key={idx} className="py-1">{skill.skill}</li>
              )) || (
                <>
                  <li>React</li>
                  <li>TypeScript</li>
                  <li>Node.js</li>
                  <li>GraphQL</li>
                </>
              )}
            </ul>
          </section>

          {/* Education Section */}
          <section className="mb-4">
            <h2 className="text-sm font-bold" style={{ color: themeColor }}>Education</h2>
            {resumeInfo?.education.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <p className="text-xs font-semibold">{edu.degree} - {edu.universityName}</p>
                <p className="text-xs">{edu.city}, {edu.state}</p>
                <p className="text-xs text-gray-600">{moment(edu.startDate).format("MMM YYYY")} - {moment(edu.endDate).format("MMM YYYY")}</p>
                <p className="text-xs text-gray-600">{edu.description}</p>
              </div>
            )) || (
              <div>
                <p className="text-xs font-semibold">B.Sc. in Computer Science</p>
                <p className="text-xs">Stanford University</p>
                <p className="text-xs">2015 - 2019</p>
              </div>
            )}
          </section>
        </div>

        {/* Right Column */}
        <div className="w-2/3">
          {/* Career Objective */}
          <section className="mb-4">
            <h2 className="text-sm font-bold" style={{ color: themeColor }}>Career Objective</h2>
            <p className="text-xs">
              {resumeInfo?.summary || "Highly skilled Full Stack Developer with expertise in building scalable applications using modern technologies like React, Node.js, and GraphQL. Aiming to leverage my experience to contribute to innovative projects."}
            </p>
          </section>

          {/* Experience Section */}
          <section className="mb-4">
            <h2 className="text-sm font-bold" style={{ color: themeColor }}>Experience</h2>
            {resumeInfo?.experience.map((exp, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-semibold">{exp.title || "Software Engineer"} at {exp.companyName || "TechCorp"}</h3>
                  <p className="text-xs">{moment(exp.startDate).format("MMM YYYY")} - {moment(exp.endDate).format("MMM YYYY")}</p>
                </div>
                <p className="text-xs text-gray-600">{exp.city || "City"}, {exp.state || "Country"}</p>
                <p className="text-xs mt-1" dangerouslySetInnerHTML={{ __html: exp.summary }} />
              </div>
            )) || (
              <div className="text-xs">
                <p className="font-semibold">Software Developer</p>
                <p>XYZ Technologies</p>
                <p>2020 - Present</p>
                <p>Worked on developing scalable APIs and full-stack web applications.</p>
              </div>
            )}
          </section>

          {/* Projects Section */}
          <section className="mb-4">
            <h2 className="text-sm font-bold" style={{ color: themeColor }}>Projects</h2>
            {resumeInfo?.projects.map((pro, idx) => (
              <div key={idx} className="mb-2">
                <h3 className="text-xs font-semibold">{pro.projectTitle}</h3>
                <p className="text-xs" dangerouslySetInnerHTML={{ __html: pro.projectDescription }} />
              </div>
            )) || (
              <div className="text-xs">
                <p className="font-semibold">Expense Tracker App</p>
                <p>Developed a full-stack expense tracker app using React and Node.js, implementing features like user authentication, data visualization, and RESTful API integration.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default IvorySkyline;
