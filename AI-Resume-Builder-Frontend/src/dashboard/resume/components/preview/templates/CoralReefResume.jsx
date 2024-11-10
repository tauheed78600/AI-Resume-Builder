import React, { useContext } from 'react';
import { resumeInfoContext } from '../../../../../context/ResumeInfoContext';
import moment from 'moment';

function CoralReefResume() {
  const { resumeInfo } = useContext(resumeInfoContext);

  return (
    <div className="p-6" style={{ color: resumeInfo?.themeColor || '#FF7F50' }}>
      <h1 className="text-2xl font-bold">{resumeInfo?.name || "Sarah Connor"}</h1>
      <p>{resumeInfo?.careerObjective || "Creative professional with a flair for design and development."}</p>

      <hr className="my-4" />

      <section>
        <h2 className="text-lg font-bold">Experience</h2>
        {resumeInfo?.experience ? (
          resumeInfo.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="font-bold">{exp.title}</h3>
              <p>{exp.company}</p>
              <p>{moment(exp.startDate).format("MMM YYYY")} - {moment(exp.endDate).format("MMM YYYY")}</p>
              <p dangerouslySetInnerHTML={{ __html: exp.description }} />
            </div>
          ))
        ) : (
          <p>Proven track record of creating visually appealing projects.</p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold">Education</h2>
        <p>Bachelor's in Design, XYZ University, 2018</p>
      </section>
    </div>
  );
}

export default CoralReefResume;
