import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { resumeInfoContext } from '../../../../context/ResumeInfoContext';
import RichTextEditor from '../RichTextEditor';
import { LoaderCircle } from 'lucide-react';
import GlobalAPI from '../../../../../service/GlobalAPI';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

function Education() {
    const [educationList, setEducationList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(resumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    // Update education info in context whenever educationList changes
    useEffect(() => {
    if (resumeInfo?.education.length > 0) {
        const hasMissingMajor = resumeInfo.education.some(exp => exp.major === undefined);

        if (hasMissingMajor) {
            const updatedExperienceList = resumeInfo.education.map(exp => ({
                ...exp,
                major: exp.major ? exp.major : uuidv4(),
            }));
            setEducationList(updatedExperienceList);
        } else {
            setEducationList(resumeInfo.education);
        }
    }
}, [resumeInfo]);  // <- Remove `educationList` from here


    useEffect(() => {
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            education: educationList,
        }));
    }, [educationList, setResumeInfo]);

    const handleChange = (index, event) => {
        const newEntries = [...educationList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationList(newEntries);
    };

    const onSave = (e) => {
        setLoading(true);
    
        let updatedEducationList = educationList.map((education) => ({
            // Explicitly set only the fields you want to send
            degree: education.degree,
            branch: education.branch,
            startDate: education.startDate ? new Date(education.startDate).toISOString() : '',
            endDate: education.endDate ? new Date(education.endDate).toISOString() : '',
            description: education.description || '',
            universityName: education.universityName,
            major: education.major,
            cgpa: education.cgpa,
        }));

        // Call the new API with the full list of educations
        GlobalAPI.addEducation(params?.resumeid, updatedEducationList)
            .then(res => {
                setResumeInfo((prevResumeInfo) => ({
                    ...prevResumeInfo,
                    education: updatedEducationList,
                }));
                setLoading(false);
                toast('All education saved successfully!');
            })
            .catch(error => {
                setLoading(false);
                toast.error('Error Saving Education!');
                console.error(error);
            });
    };
    

    const addEducation = () => {
        setEducationList([...educationList, {
            degree: '',
            description: '',
            major: uuidv4(),
            state: '',
            startDate: '',
            endDate: '',
            universityName: '',
            educationId: '',
        }]);
    };

    const removeEducation = () => {
        setEducationList(educationList.slice(0, -1));
    };

    const handleRichTextEditor = (value, name, index) => {
        const newEntries = [...educationList];
        newEntries[index][name] = value;
        setEducationList(newEntries);
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education Details</h2>
            <p>Enter your Education Details here</p>
            <form onSubmit={onSave}>
                {educationList.map((edu, index) => (
                    <div key={index} className='gap-3 border p-3 my-5 rounded-lg'>
                        <div className='grid grid-cols-2 mt-5 gap-3'>
                            <div>
                                <label className='text-xs'>Enter your Degree name</label>
                                <Input name="degree" required onChange={(event) => handleChange(index, event)} type="text" placeholder="Ex: XYZ University" value={edu.degree} />
                            </div>
                            <div>
                                <label className='text-xs'>Enter CGPA</label>
                                <Input name="cgpa" required onChange={(event) => handleChange(index, event)} type="text" placeholder="Ex: 8.9" value={edu.cgpa} />
                            </div>
                        </div>
                        <div>
                            <label className='text-xs'>Enter Branch</label>
                            <Input name="branch" required onChange={(event) => handleChange(index, event)} type="text" placeholder="Ex: CSE" value={edu.branch} />
                        </div>
                        <div>
                            <label className='text-xs'>Enter College/University name</label>
                            <Input name="universityName" required onChange={(event) => handleChange(index, event)} type="text" placeholder="Ex: XYZ University" value={edu.universityName} />
                        </div>
                        <div className='grid grid-cols-2 mt-5 gap-3'>
                            <div>
                                <label className='text-xs'>Enter Start Date</label>
                                <Input name="startDate" required onChange={(event) => handleChange(index, event)} type="date" value={edu.startDate} />
                            </div>
                            <div>
                                <label className='text-xs'>Enter End Date</label>
                                <Input name="endDate" required onChange={(event) => handleChange(index, event)} type="date" value={edu.endDate} />
                            </div>
                            <div className='col-span-2'>
                                <RichTextEditor
                                    val='education'
                                    index={index}
                                    defaultValue={edu?.description}
                                    onRichTextEditorChange={(event) => handleRichTextEditor(event, 'description', index)} />
                            </div>
                        </div>
                    </div>
                ))}
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button type="button" variant="outline" onClick={addEducation} className="text-primary">+ Add Education</Button>
                        <Button type="button" variant="outline" onClick={removeEducation} className="text-primary">- Remove Education</Button>
                    </div>
                    <Button disabled={loading} onClick={onSave}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Education;
