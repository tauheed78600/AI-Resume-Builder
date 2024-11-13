import React, { useContext, useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { resumeInfoContext } from '../../../context/ResumeInfoContext'
import { ArrowBigLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useParams, useSearchParams } from 'react-router-dom'
import Objective from './forms/Objective'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import { Link, Navigate } from 'react-router-dom'
import Projects from './forms/Projects'
import { Eye } from 'lucide-react';
import { Input } from '../../../components/ui/input'


function FormSection() {

  const {resumeInfo, setResumeInfo} = useContext(resumeInfoContext)
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enablenext, setEnablenext] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [error, setError] = useState('');

  const {resumeid} = useParams()

  return (
    <div>
      <div className='flex justify-between items-center max-w-3xl mx-auto'>
        <div className='flex gap-2'>
          <Link to={'/dashboard'}>
            <Button><Home/></Button>
          </Link>
          {/* <Link to={`/my-resume/${resumeid}/view`}> */}
            <Button onClick = {()=>{setOpenDialog(true)}}><Eye/></Button>
          {/* </Link> */}
        <Button variant = 'outline' size="sm" className='flex gap-2'><LayoutGrid/>Theme</Button>

        </div>
        <div className='flex gap-2 '>
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
      activeFormIndex == 4? <Projects enablenext = {(v) =>setEnablenext(v)}/>:
      activeFormIndex == 5? <Education enablenext = {(v)=>setEnablenext(v)}/>:
      activeFormIndex == 6? <Skills enablenext = {(v)=>setEnablenext(v)}/>:
      activeFormIndex == 7?
      <Navigate to ={'/my-resume/' + resumeid + '/view'}/>
      :null}

      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Your Resume</DialogTitle>

                <div>
                  Please
                </div>

              </DialogHeader>
            </DialogContent>
          </Dialog>


    </div>
  )
}

export default FormSection
