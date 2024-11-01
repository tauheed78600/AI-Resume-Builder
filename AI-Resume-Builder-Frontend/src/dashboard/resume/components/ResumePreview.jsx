import React, { useContext } from 'react'
import { resumeInfoContext } from '../../../context/ResumeInfoContext'
import PersonalDetails from './preview/PersonalDetails'
import Objective from './forms/Objective'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationPreview from './preview/EducationPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {

    const {resumeInfo, setResumeInfo} = useContext(resumeInfoContext)

    return (
        <div className='shadow-lg h-full p-14 border-t-[20px]'
        style = {{
            borderColor: resumeInfo?.themeColor
        }}>
        <PersonalDetails resumeInfo = {resumeInfo}/>
        <SummaryPreview resumeInfo = {resumeInfo}/>
        <ExperiencePreview resumeInfo = {resumeInfo}/>
        <EducationPreview resumeInfo = {resumeInfo}/>
        <SkillsPreview resumeInfo = {resumeInfo}/>
        </div>
    )
}

export default ResumePreview
