import React, { useContext } from 'react';
import { resumeInfoContext } from '../../../../../context/ResumeInfoContext';
import moment from 'moment';

function AzureWaveResume() {
  const { resumeInfo } = useContext(resumeInfoContext);

  const themeColor = resumeInfo?.themeColor || '#007ACC';
  const secondaryColor = '#003A70';

  return (
    <div className="p-6 bg-white rounded-lg shadow-md" style={{ color: themeColor, fontFamily: 'Arial, sans-serif' }}>
      {/* Personal Details */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{resumeInfo?.firstName || "Aiden"} {resumeInfo?.lastName || "Kelly"}</h1>
        <h2 className="text-lg font-semibold text-gray-700">{resumeInfo?.jobTitle || "React Full Stack Developer"}</h2>
        <p>{resumeInfo?.email || "johndoe@example.com"}</p>
        <p>{resumeInfo?.number || "+123456789"}</p>
        <p>{resumeInfo?.address || "New York, NY"}</p>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Career Objective */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-800" style={{ color: secondaryColor }}>Career Objective</h2>
        <p className="text-gray-600">
          {resumeInfo?.summary || "A skilled Full Stack Developer with experience in React, TypeScript, and SQL. Dedicated to delivering high-quality software solutions and working collaboratively to achieve project milestones."}
        </p>
      </section>

      <hr className="my-4 border-gray-300" />

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-800" style={{ color: secondaryColor }}>Experience</h2>
        {resumeInfo?.experience && resumeInfo.experience.length > 0 ? (
          resumeInfo.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="text-lg font-semibold">{exp.title || "Software Engineer"}</h3>
              <p className="text-gray-700">{exp.companyName || "ABC Corp"}</p>
              <p className="text-gray-500">{moment(exp.startDate).format("MMM YYYY")} - {exp.endDate ? moment(exp.endDate).format("MMM YYYY") : "Present"}</p>
              <p className="text-gray-600">{exp.city || "City"}, {exp.state || "Country"}</p>
              <p dangerouslySetInnerHTML={{ __html: exp.summary || "<ul><li>Developed software solutions.</li><li>Collaborated with cross-functional teams.</li></ul>" }} />
            </div>
          ))
        ) : (
          <div className="text-gray-600">
            <h3 className="text-lg font-semibold">Full Stack Developer</h3>
            <p>TechStartup Ltd</p>
            <p>2019 - 2021</p>
            <p>New York, NY</p>
            <p>Worked on a React-based application, optimizing performance and collaborating with teams to enhance user experience.</p>
          </div>
        )}
      </section>

      <hr className="my-4 border-gray-300" />

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-800" style={{ color: secondaryColor }}>Education</h2>
        {resumeInfo?.education && resumeInfo.education.length > 0 ? (
          resumeInfo.education.map((edu, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-semibold text-gray-700">{edu.degree || "Bachelor of Science in Computer Science"}</p>
              <p className="text-gray-700">{edu.universityName || "XYZ University"}</p>
              <p className="text-gray-500">{moment(edu.startDate).format("MMM YYYY")} - {moment(edu.endDate).format("MMM YYYY")}</p>
              <p className="text-gray-600">CGPA: {edu.cgpa || "9.0"}</p>
            </div>
          ))
        ) : (
          <div className="text-gray-600">
            <p className="font-semibold">Bachelor of Science in Computer Science</p>
            <p>University of London</p>
            <p>2011 - 2015</p>
            <p>CGPA: 9.0</p>
          </div>
        )}
      </section>

      <hr className="my-4 border-gray-300" />

      {/* Skills */}
      <section>
        <h2 className="text-xl font-bold text-gray-800" style={{ color: secondaryColor }}>Skills</h2>
        <div className="text-gray-600">
          {resumeInfo?.skills && resumeInfo.skills.length > 0 ? (
            <ul className="list-disc list-inside">
              {resumeInfo.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
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
    </div>
  );
}

export default AzureWaveResume;
