import React, { useContext, useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { resumeInfoContext } from '../../../context/ResumeInfoContext'
import { ArrowBigLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { useParams, useSearchParams } from 'react-router-dom'
import Objective from './forms/Objective'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import { Link, Navigate } from 'react-router-dom'

function FormSection() {

  const {resumeInfo, setResumeInfo} = useContext(resumeInfoContext)
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enablenext, setEnablenext] = useState(false)

  const {resumeid} = useParams()

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <Link to={'/dashboard'}>
            <Button><Home/></Button>
          </Link>
        <Button variant = 'outline' size="sm" className='flex gap-2'><LayoutGrid/>Theme</Button>

        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1 && <Button size = "sm"
          onClick = {()=>setActiveFormIndex(activeFormIndex - 1)}
          ><ArrowBigLeft/></Button>}
          <Button size = "sm" className="flex gap-2"
          disabled = {!enablenext}
          onClick = {()=>setActiveFormIndex(activeFormIndex + 1)}
          >Next<ArrowRight/></Button>
        </div>
      </div>
      {/* Personal Details */}
     {activeFormIndex == 1? <PersonalDetails enablenext = {(v)=>setEnablenext(v)}/>:
      activeFormIndex == 2? <Objective enablenext = {(v)=>setEnablenext(v)}/>:
      activeFormIndex == 3? <Experience enablenext = {(v)=>setEnablenext(v)}/>:
      activeFormIndex == 4? <Education enablenext = {(v)=>setEnablenext(v)}/>:
      activeFormIndex == 5? <Skills enablenext = {(v)=>setEnablenext(v)}/>:
      activeFormIndex == 6?
      <Navigate to ={'/my-resume/' + resumeid + '/view'}/>
      :null}
    </div>
  )
}

export default FormSection
