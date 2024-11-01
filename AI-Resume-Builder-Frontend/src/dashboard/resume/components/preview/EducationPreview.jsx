import React, { useContext } from 'react';
import { resumeInfoContext } from '../../../../context/ResumeInfoContext';
import moment from 'moment';  // Import moment

function EducationPreview() {

    const { resumeInfo } = useContext(resumeInfoContext);
    console.log("resumeInfo in EducationPreview", resumeInfo);

    return (
        <div>
            <div>
                <h2 className='flex justify-center text-sm font-bold'>Education</h2>
                <hr style={{ borderColor: resumeInfo?.themeColor }} />
                {resumeInfo?.education.map((edu, idx) => (
                    <div key={idx}>
                      <div className='flex justify-between items-center mb-2'>
                        <div>
                            <p className='font-bold text-xs'>{edu.degree}, {edu.branch} - {edu.cgpa} CGPA</p>
                            <p className='text-xs'>{edu.universityName}</p>
                            <p className='text-xs'>{edu.state}, {edu.city}</p>
                        </div>
                        <div className='flex-shrink-0 text-xs'>
                            <p>{moment(edu.startDate).format("MMM YYYY")} - {moment(edu.endDate).format("MMM YYYY")}</p>
                        </div>
                    </div>
                    <div className='text-xs' dangerouslySetInnerHTML={{__html:edu?.description}} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EducationPreview;
