import React from 'react';

function ExperiencePreview({ resumeInfo }) {
  console.log("resume info in experience preview", resumeInfo);

  return (
    <div>
      <div>
        <h2 className='flex justify-center text-sm font-bold'>Professional Experience</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />
        <div className=''>
          <div className='text-xs'>
            {resumeInfo?.experience.map((exp, idx) => (
              <div>
                <div key={idx} className='flex justify-between items-center mb-2'>
                <div>
                  <p className='font-bold'>{exp.title}, {exp.companyName}</p>
                  <p className='text-xs' >{exp.state},{exp.city}</p>
                </div>
                <div className='flex-shrink-0 text-xs'>
                  <p>{exp.startDate} - {exp.endDate}</p>
                </div>
              </div>

              <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:exp?.summary}} />
              </div>
              
            ))}
            <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperiencePreview;