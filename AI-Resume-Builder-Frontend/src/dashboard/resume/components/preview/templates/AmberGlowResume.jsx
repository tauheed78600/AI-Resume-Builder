import React, { useContext } from 'react';
import moment from 'moment';
// import { resumeInfoContext } from '../../../../context/ResumeInfoContext';
import { resumeInfoContext } from '../../../../../context/ResumeInfoContext';

function AmberGlowResume() {
  const { resumeInfo } = useContext(resumeInfoContext);

  const secondaryColor = "#FF8C00"

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200" style={{ fontFamily: 'Arial, sans-serif', width: '800px', color: secondaryColor }}>
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">{resumeInfo?.name || "Michael Scott"}</h1>
        <div className="text-right">
          <p>{resumeInfo?.email || "michael@example.com"}</p>
          <p>{resumeInfo?.phone || "+1234567890"}</p>
        </div>
      </div>

      <hr className="my-4" />

      {/* Experience Section */}
      <section>
        <h2 className="text-xl font-bold">Experience</h2>
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
          <p>Extensive experience in managing cross-functional teams.</p>
        )}
      </section>
    </div>
  );
}

export default AmberGlowResume;
