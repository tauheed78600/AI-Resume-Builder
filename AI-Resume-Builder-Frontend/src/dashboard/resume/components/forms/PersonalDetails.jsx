import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../../../../components/ui/input'
import { Button } from '../../../../components/ui/button'
import { resumeInfoContext } from '../../../../context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalAPI from '../../../../../service/GlobalAPI'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

function PersonalDetails({ enablenext }) {

    const params = useParams()

    const { resumeInfo, setResumeInfo } = useContext(resumeInfoContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        address: '',
        number: '',
        email: ''
    });
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        enablenext(false)
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })

        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })
    }

    // Prefill the form data from resumeInfo
    useEffect(() => {
        if (resumeInfo) {
            setFormData({
                firstName: resumeInfo.firstName || '',
                lastName: resumeInfo.lastName || '',
                jobTitle: resumeInfo.jobTitle || '',
                address: resumeInfo.address || '',
                number: resumeInfo.number || '',
                email: resumeInfo.email || ''
            });
        }
    }, [resumeInfo]); // Dependency array includes resumeInfo to run the effect when resumeInfo changes

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        // Prepare data
        const data = {
            data: formData
        };

        console.log("formData in line 46", formData);
        console.log(params.resumeid);

        GlobalAPI.updateResumeDetail(params.resumeid, data)
            .then(resp => {
                console.log("returned Response", resp);
                enablenext(true);
                setLoading(false);
                toast("Details Saved");
            })
            .catch(error => {
                console.error("API call error:", error);
                setLoading(false);
                toast.error("Failed to save details");
            });
    };


    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Get Started with basic information</p>
            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName" value={formData.firstName} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName" value={formData.lastName} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle" value={formData.jobTitle} required onChange={handleInputChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address" value={formData.address} required onChange={handleInputChange} />
                    </div>
                    <div >
                        <label className='text-sm'>Phone Number</label>
                        <Input name="number" value={formData.number} required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input name="email" value={formData.email} required onChange={handleInputChange} />
                    </div>
                    <div className='mt-3 flex justify-end'>
                        <Button
                            disabled={loading}
                            type="submit">{loading ? <LoaderCircle className='animate-spin' /> : 'Save'}</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetails;
