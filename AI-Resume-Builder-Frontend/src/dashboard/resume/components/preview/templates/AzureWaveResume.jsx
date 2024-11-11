import React, { useContext } from 'react';
import { resumeInfoContext } from '../../../../../context/ResumeInfoContext';
import moment from 'moment';

function AzureWaveResume() {
  const { resumeInfo } = useContext(resumeInfoContext);

  const themeColor = resumeInfo?.themeColor || '#007ACC';
  const secondaryColor = '#003A70';

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300" style={{ color: themeColor, fontFamily: 'Arial, sans-serif', width: '800px', borderTop: `5px solid ${secondaryColor}` }}>
      
      {/* Personal Details */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">
          {resumeInfo?.firstName || "Aiden"} {resumeInfo?.lastName || "Kelly"}
        </h1>
        <h2 className="text-sm font-semibold text-gray-700 mb-1">
          {resumeInfo?.jobTitle || "React Full Stack Developer"}
        </h2>
        <p className="text-xs text-gray-600">{resumeInfo?.address || "New York, NY"}</p>
        <div className="flex justify-between text-xs font-medium mt-1">
          <p>{resumeInfo?.email || "johndoe@example.com"}</p>
          <p>{resumeInfo?.number || "+123456789"}</p>
        </div>
      </div>

      {/* Section Divider */}
      <hr className="my-2 border" style={{ borderColor: secondaryColor }} />

      {/* Career Objective */}
      <section className="">
        <h2 className="text-base font-bold" style={{ color: secondaryColor }}>Career Objective</h2>
        <p className="text-xs">
          {resumeInfo?.summary || "A skilled Full Stack Developer with experience in React, TypeScript, and SQL. Dedicated to delivering high-quality software solutions and working collaboratively to achieve project milestones."}
        </p>
      </section>

      {/* Section Divider */}
      <hr className="my-2 border" style={{ borderColor: secondaryColor }} />

      {/* Experience */}
      <section className="mb-2">
        <h2 className="text-base font-bold" style={{ color: secondaryColor }}>Experience</h2>
        {resumeInfo?.experience && resumeInfo.experience.length > 0 ? (
          resumeInfo.experience.map((exp, idx) => (
            <div key={idx} className="mb-2">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-black">
                  {exp.title || "Software Engineer"}, {exp.companyName || "ABC Corp"}
                </h2>
                <p className="text-xs whitespace-nowrap ml-2">{exp.startDate} - {exp.endDate}</p>
              </div>
              <p className="text-xs">{exp.city || "City"}, {exp.state || "Country"}</p>
              <div className="text-xs" style={{ display: 'inline-block', maxWidth: '100%', whiteSpace: 'normal' }}>
                <p className='' dangerouslySetInnerHTML={{ __html: exp.summary || "<ul><li>Developed software solutions.</li><li>Collaborated with cross-functional teams.</li></ul>" }} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-xs text-gray-600">
            <h3 className="text-sm font-semibold">Full Stack Developer</h3>
            <p>TechStartup Ltd</p>
            <p>2019 - 2021</p>
            <p>New York, NY</p>
            <p>Worked on a React-based application, optimizing performance and collaborating with teams to enhance user experience.</p>
          </div>
        )}
      </section>

      {/* Section Divider */}
      <hr className="my-2 border" style={{ borderColor: secondaryColor }} />

      {/* Projects */}
      <section className="mb-2">
        <h2 className="text-base font-bold" style={{ color: secondaryColor }}>Projects</h2>
        {resumeInfo?.projects.map((pro, idx) => (
          <div key={idx} className="mb-1">
            <div className="flex justify-between">
              <p className="font-semibold text-xs text-gray-700">{pro.projectTitle || "An Expense Tracker"}</p>
              <p className="text-xs text-gray-500">{moment(pro.startDate).format("MMM YYYY")} - {moment(pro.endDate).format("MMM YYYY")}</p>
            </div>
            <p className="text-xs" dangerouslySetInnerHTML={{ __html: pro.projectDescription }}></p>
          </div>
        ))}
      </section>

      {/* Section Divider */}
      <hr className="my-2 border" style={{ borderColor: secondaryColor }} />

      {/* Education */}
      <section className="mb-2">
        <h2 className="text-base font-bold" style={{ color: secondaryColor }}>Education</h2>
        {resumeInfo?.education && resumeInfo.education.length > 0 ? (
          resumeInfo.education.map((edu, idx) => (
            <div key={idx} className="mb-1">
              <div className="flex justify-between">
                <p className="font-semibold text-xs text-gray-700">{edu.degree || "Bachelor of Science in Computer Science"}, {edu.branch}, {edu.universityName || "XYZ University"}</p>
                <p className="text-xs text-gray-500">{moment(edu.startDate).format("MMM YYYY")} - {moment(edu.endDate).format("MMM YYYY")}</p>
              </div>
              <p className="text-xs text-gray-600">CGPA: {edu.cgpa || "9.0"}</p>
              <p className="text-xs">{edu.description}</p>
            </div>
          ))
        ) : (
          <div className="text-xs text-gray-600">
            <p className="font-semibold">Bachelor of Science in Computer Science</p>
            <p>University of London</p>
            <p>2011 - 2015</p>
            <p>CGPA: 9.0</p>
          </div>
        )}
      </section>

      {/* Section Divider */}
      <hr className="my-2 border" style={{ borderColor: secondaryColor }} />

      {/* Skills */}
      <section>
        <h2 className="text-base font-bold" style={{ color: secondaryColor }}>Skills</h2>
        <div className="grid grid-cols-2 gap-3 my-4">
          {resumeInfo?.skills && resumeInfo.skills.length > 0 ? (
            resumeInfo?.skills.map((ski, index) => (
              <div key={index} className="flex items-center justify-between">
                <h2 className="text-xs">{ski.skill}</h2>
                <div className="h-2 bg-gray-200 w-[120px]">
                  <div
                    className="h-2"
                    style={{
                      backgroundColor: '#000000',
                      width: ski?.rating * 20 + '%',
                    }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <ul className="list-disc list-inside">
              <li>React</li>
              <li>TypeScript</li>
              <li>SQL</li>
              <li>REST APIs</li>
              <li>Python</li>
              <li>AWS</li>
            </ul>
          )}
        </div>
      </section>

      {/* Section Divider */}
      <hr className="my-2 border" style={{ borderColor: secondaryColor }} />

    </div>
  );
}

export default AzureWaveResume;
