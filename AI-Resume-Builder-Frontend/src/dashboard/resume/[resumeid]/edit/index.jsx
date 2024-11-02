import { CloudHail } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { resumeInfoContext } from '../../../../context/ResumeInfoContext';
import GlobalAPI from '../../../../../service/GlobalAPI';

function EditResume({ resumeList }) {
    const params = useParams();
    const [resumeInfo, setResumeInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        userEmail: '',
        email: '',
        number: '',
        summary: '',
        themeColor: '#000000',
        username: '',
        jobTitle: '',
        skills: [],
        education: [],
        experience: [],
    });
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (resumeInfo) {
            console.log("Updated resumeInfo in useEffect:", resumeInfo);
        }
    }, [resumeInfo]);

    useEffect(() => {
        const resumeId = parseInt(params?.resumeid);
        const foundResume = resumeList.find(resume => resume.userid === resumeId);

        if (foundResume) {
            const fetchResumeData = async () => {
                try {
                    const resp = await GlobalAPI.getResumeData(foundResume.userid);
                    console.log("Fetched resume data:", resp.data);
                    setResumeInfo(resp.data);
                    console.log("resumeInfo in line 30 editResume", resumeInfo)
                } catch (error) {
                    console.error("Error fetching resume data:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchResumeData();
        } else {
            console.error("Resume not found");
            setLoading(false);
        }
    }, [resumeList, params.resumeid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <resumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className='flex justify-center font-bold text-4xl italic'>
                {resumeInfo?.title}
            </div>


            <div className='grid grid-cols-2 md: p-10 gap-10'>
                <FormSection />
                <ResumePreview />
            </div>
        </resumeInfoContext.Provider>
    );
}

export default EditResume;
