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
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  summary: '',
  major: ''
};

function Experience() {
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(resumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.experience.length > 0) {
      const hasMissingMajor = resumeInfo.experience.some((exp) => exp.major === undefined);

      if (hasMissingMajor) {
        const updatedExperienceList = resumeInfo.experience.map((exp) => ({
          ...formField,
          ...exp,
          major: exp.major ? exp.major : uuidv4()
        }));
        setExperienceList(updatedExperienceList);
      } else {
        setExperienceList(resumeInfo?.experience);
      }
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const newEntries = [...experienceList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        summary: '',
        major: uuidv4()
      }
    ]);
  };

  const RemoveExperience = () => {
    setExperienceList(experienceList => experienceList.slice(0, -1));
};

  const handleRichTextEditor = (value, name, index) => {
        const newEntries = [...experienceList];
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

  
  useEffect(() => {
      setResumeInfo({
        ...resumeInfo,
        experience: experienceList
      });
  }, [experienceList, setResumeInfo]);
  

  const onSave = () => {
    setLoading(true);
  
    const filteredExperienceList = experienceList.map(exp => {
        const { user, ...experienceData } = exp;
        return experienceData;
      });
    
      const data = {
        experiences: filteredExperienceList,
      };
  

    GlobalAPI.updateExperience(params?.resumeid, data)
      .then((res) => {
        setResumeInfo((prevResumeInfo) => ({
          ...prevResumeInfo,
          experience: experienceList
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
  
  console.log('line 83', experienceList);

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input
                    name='title'
                    onChange={(event) => handleChange(index, event)}
                    value={item?.title}
                  />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input
                    name='companyName'
                    onChange={(event) => handleChange(index, event)}
                    value={item?.companyName}
                  />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input
                    name='city'
                    onChange={(event) => handleChange(index, event)}
                    value={item?.city}
                  />
                </div>
                <div>
                  <label className='text-xs'>State</label>
                  <Input
                    name='state'
                    onChange={(event) => handleChange(index, event)}
                    value={item?.state}
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
                    defaultValue={item?.summary}
                    onRichTextEditorChange={(event) => handleRichTextEditor(event, 'summary', index)}
                    val = ""
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={AddNewExperience} className='text-primary'>
              {' '}
              + Add More Experience
            </Button>
            <Button variant='outline' onClick={RemoveExperience} className='text-primary'>
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

export default Experience;