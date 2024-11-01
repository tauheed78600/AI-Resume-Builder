import React, { useEffect, useState, useContext } from 'react';
import { resumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { Input } from '../../../../components/ui/input';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '../../../../components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import GlobalAPI from '../../../../../service/GlobalAPI';
import { toast } from 'sonner';

const formField = {
    skill: '',
    rating: 0,
    major: ''
}

function Skills() {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(resumeInfoContext);
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState([{ skill: '', rating: 0, major: uuidv4() }]);

    // Populate skills from resumeInfo when component mounts
    useEffect(() => {
        if (resumeInfo?.skills && resumeInfo.skills.length > 0) {
            const updatedSkills = resumeInfo.skills.map(skill => ({
                skill: skill.skill || '', // Ensure skill is set correctly
                rating: skill.rating || 0, // Default to 0 if undefined
                major: skill.major || uuidv4() // Generate major if not present
            }));
            setSkills(updatedSkills);
        }
    }, [resumeInfo]);

    const handleChange = (idx, name, value) => {
        const newEntries = skills.slice();
        newEntries[idx] = {
            ...newEntries[idx],
            [name]: value,
        };
        setSkills(newEntries);
        setResumeInfo(prevResumeInfo => ({
            ...prevResumeInfo,
            skills: newEntries
        }));
    };

    const onSave = async () => {
        setLoading(true);
        let skillsList = skills.map((ski)=>({
            rating: ski.rating,
            major: ski.major,
            skill: ski.skill
        }))

        GlobalAPI.addSkills(params?.resumeid, skillsList)
        .then(res => {
            setResumeInfo((prevResumeInfo) => ({
                ...prevResumeInfo,
                skills: skillsList,
            }));
            setLoading(false);
            toast('All Skills saved successfully!');
        })
        .catch(error => {
            setLoading(false);
            toast.error('Error Saving Skills!');
            console.error(error);
        });
    };

    const addNewSkill = () => {
        setSkills([...skills, { skill: '', rating: 0, major: uuidv4() }]);
    };

    const removeSkill = () => {
        setSkills(skills.slice(0, -1));
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your Skills Here</p>
            <div>
                {skills.map((ski, idx) => (
                    <div key={ski.major} className='flex justify-between border rounded-lg p-3 gap-2 mb-2'>
                        <div>
                            <label className='text-xs'>Enter the Skill</label>
                            <Input name="skill" onChange={(e) => handleChange(idx, 'skill', e.target.value)} value={ski.skill} />
                        </div>
                        <Rating
                            name="rating"
                            style={{ maxWidth: 150, marginTop: 17 }}
                            value={ski.rating}
                            onChange={(v) => handleChange(idx, 'rating', v)}
                        />
                    </div>
                ))}
                <div className='flex justify-between mt-3'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={addNewSkill} className="text-primary"> + Add</Button>
                        <Button variant="outline" onClick={removeSkill} className="text-primary"> - Remove</Button>
                    </div>
                    <Button disabled={loading} onClick={onSave}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Skills;