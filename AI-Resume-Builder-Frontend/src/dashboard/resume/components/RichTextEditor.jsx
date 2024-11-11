import { Button } from '@/components/ui/button';
import { resumeInfoContext } from '../../../context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from '../../../../service/AiModal';
import { toast } from 'sonner';


const PROMPT='position title: {positionTitle} , Depends on position title give me 1-2 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'
function RichTextEditor({ onRichTextEditorChange,index,defaultValue, val}) {
    const [value,setValue]=useState(defaultValue);
    const {resumeInfo,setResumeInfo}=useContext(resumeInfoContext)
    const [loading,setLoading]=useState(false);



    const GenerateSummeryFromAI=async()=>{
      console.log("val in line 16", val)
      if (val !== 'education' && val !== 'projects'){
        if(!resumeInfo?.experience[index]?.title)
          {
            toast('Please Add Position Title');
            return ;
          }
          setLoading(true)
          const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title);
          
          const result=await AIChatSession.sendMessage(prompt);
          console.log(result.response.text());
          const resp=result.response.text()
          setValue(resp.replace('[','').replace(']',''));
          setLoading(false);
      }else if(val === 'education'){
        console.log(resumeInfo)
        if(!resumeInfo?.education[index]?.degree || !resumeInfo?.education[index]?.universityName ||
          !resumeInfo?.education[index]?.branch || !resumeInfo?.education[index]?.startDate || !resumeInfo?.education[index]?.endDate
        ){
            toast('Please fill all the details to generate the description');
            return ;
          }
          setLoading(true)
          const prompt1 = "Degree: {degree}, College: {college}, Branch: {branch}, Start Date: {startDate}, End Date: {endDate} - Based on these details, provide 1-2 bullet points for my education in a resume. (Please No JSON or JSON array and format the result in HTML tags)."
          
          const prompt = prompt1
            .replace('{degree}', resumeInfo?.education[index]?.degree)
            .replace('{college}', resumeInfo?.education[index]?.universityName)
            .replace('{branch}', resumeInfo?.education[index]?.branch)
            .replace('{startDate}', resumeInfo?.education[index]?.startDate)
            .replace('{endDate}', resumeInfo?.education[index]?.endDate)

            console.log("prompt line 49", prompt)

            
          const result=await AIChatSession.sendMessage(prompt);
          console.log(result.response.text());
          const resp=result.response.text()
          setValue(resp.replace('[','').replace(']',''));
          setLoading(false);
      }else if(val === 'projects'){
        if(!resumeInfo?.projects[index]?.projectTitle)
          {
            toast('Please Add Project Title');
            return ;
          }
          const PROMPT2 = "Generate a project description of a project name {projectTitle}. Dont give Json Array in the response"
          setLoading(true)
          const prompt=PROMPT2.replace('{projectTitle}',resumeInfo.projects[index].projectTitle);
          
          const result=await AIChatSession.sendMessage(prompt);
          console.log("result.response.text() in projects", result.response.text());
          const resp=result.response.text()
          setValue(resp.replace('[','').replace(']',''));
          setLoading(false);
      }
      
    }
  
    return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summaary</label>
        <Button variant="outline" size="sm" 
        onClick={GenerateSummeryFromAI}
        disabled={loading}
        className="flex gap-2 border-primary text-primary">
          {loading?
          <LoaderCircle className='animate-spin'/>:  
          <>
           <Brain className='h-4 w-4'/> Generate from AI 
           </>
        }
         </Button>
      </div>
    <EditorProvider>
    <Editor
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onRichTextEditorChange(e.target.value, 'summary', index);  // Pass the value directly
        }}
      >
         <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />         


        </Toolbar>
      </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor