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
    const secondaryColor = '#333333'
    return (
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200" style={{ fontFamily: 'Arial, sans-serif', width: '800px', color: secondaryColor }}>
        <PersonalDetails resumeInfo = {resumeInfo}/>
        <SummaryPreview resumeInfo = {resumeInfo}/>
        <ExperiencePreview resumeInfo = {resumeInfo}/>
        <EducationPreview resumeInfo = {resumeInfo}/>
        <SkillsPreview resumeInfo = {resumeInfo}/>
        </div>
    )
}

export default ResumePreview
