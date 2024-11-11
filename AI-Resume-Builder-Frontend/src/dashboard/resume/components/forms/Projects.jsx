import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { resumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalAPI from '../../../../../service/GlobalAPI';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const formField = {
  projectTitle: '',
  projectDescription: '',
  startDate: '',
  endDate: '',
};

function Projects() {
  const [projectsList, setProjectsList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(resumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.projects.length > 0) {
      const hasMissingMajor = resumeInfo.projects.some((exp) => exp.major === undefined);

      if (hasMissingMajor) {
        const updatedExperienceList = resumeInfo.experience.map((exp) => ({
          ...formField,
          ...exp,
          major: exp.major ? exp.major : uuidv4()
        }));
        setProjectsList(updatedExperienceList);
      } else {
        setProjectsList(resumeInfo?.projects);
      }
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const newEntries = [...projectsList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setProjectsList(newEntries);
  };

  const AddNewProject = () => {
    setProjectsList([
      ...projectsList,
      {
        projectTitle: '',
        projectDescription: '',
        startDate: '',
        endDate: '',
        major: uuidv4()
      }
    ]);
  };

  const RemoveProjects = () => {
    setProjectsList(projectsList => projectsList.slice(0, -1));
};

  const handleRichTextEditor = (value, name, index) => {
        const newEntries = [...projectsList];
        newEntries[index][name] = value;
        setProjectsList(newEntries);
    };

  
  useEffect(() => {
      setResumeInfo({
        ...resumeInfo,
        projects: projectsList
      });
  }, [projectsList, setResumeInfo]);

  

  const onSave = () => {
    setLoading(true);
  
    const filteredExperienceList = projectsList.map(exp => {
        const { user, ...projectsData } = exp;
        return projectsData;
      });
    
  

    GlobalAPI.updateProjects(params?.resumeid, filteredExperienceList)
      .then((res) => {
        setResumeInfo((prevResumeInfo) => ({
          ...prevResumeInfo,
          projects: projectsList
        }));
        setLoading(false);
        toast('All experiences saved successfully!');
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Error saving experiences!');
        console.error(error);
      });
  };
  
  console.log('line 83', projectsList);

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 max-w-3xl mx-auto'>
        <h2 className='font-bold text-lg'>Project Details</h2>
        <p>Add Your Project Details</p>
        <div>
          {projectsList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Project Title</label>
                  <Input
                    name='projectTitle'
                    onChange={(event) => handleChange(index, event)}
                    value={item?.projectTitle}
                  />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input
                    type='date'
                    name='startDate'
                    onChange={(event) => handleChange(index, event)}
                    value={item?.startDate}
                  />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input
                    type='date'
                    name='endDate'
                    onChange={(event) => handleChange(index, event)}
                    value={item?.endDate}
                  />
                </div>
                <div className='col-span-2'>
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.projectDescription}
                    onRichTextEditorChange={(event) => handleRichTextEditor(event, 'projectDescription', index)}
                    val = "projects"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={AddNewProject} className='text-primary'>
              {' '}
              + Add More Projects
            </Button>
            <Button variant='outline' onClick={RemoveProjects} className='text-primary'>
              {' '}
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Projects;