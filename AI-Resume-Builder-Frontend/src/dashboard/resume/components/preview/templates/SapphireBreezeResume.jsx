import React, { useContext } from 'react';
import { resumeInfoContext } from '../../../../../context/ResumeInfoContext';
import moment from 'moment';

function SapphireBreezeResume() {
  const { resumeInfo } = useContext(resumeInfoContext);
  const secondaryColor='#1F77B4'

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200" style={{ fontFamily: 'Arial, sans-serif', width: '800px', color: secondaryColor }}>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{resumeInfo?.name || "Alice Johnson"}</h1>
          <p>{resumeInfo?.careerObjective || "An experienced developer with a passion for cutting-edge technologies."}</p>
        </div>
        <div>
          <p>{resumeInfo?.email || "alice.johnson@example.com"}</p>
          <p>{resumeInfo?.phone || "+987654321"}</p>
        </div>
      </div>

      <hr className="my-4" />

      <section>
        <h2 className="text-lg font-bold">Experience</h2>
        {resumeInfo?.experience ? (
          resumeInfo.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="font-bold">{exp.title}</h3>
              <p>{exp.company}</p>
              <p>{moment(exp.startDate).format("MMM YYYY")} - {moment(exp.endDate).format("MMM YYYY") || "Present"}</p>
              <p dangerouslySetInnerHTML={{ __html: exp.description }} />
            </div>
          ))
        ) : (
          <p>Worked as a lead engineer in developing scalable applications.</p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold">Skills</h2>
        <ul>
          {resumeInfo?.skills || <li>JavaScript, React, Node.js, MongoDB</li>}
        </ul>
      </section>
    </div>
  );
}

export default SapphireBreezeResume;
