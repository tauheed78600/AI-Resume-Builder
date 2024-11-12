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
    console.log("resumeInfo in personalDetails", resumeInfo)
    const [openLinks, setOpenLinks] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        address: '',
        number: '',
        email: '',
        links: []
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

    const handleLinkChange = (e, linkType) => {
        const { value } = e.target;
        setFormData((prevFormData) => {
            const updatedLinks = [...prevFormData.links];
            const existingIndex = updatedLinks.findIndex(link => link.name === linkType);

            if (existingIndex > -1) {
                updatedLinks[existingIndex].link = value;
            } else {
                updatedLinks.push({ name: linkType, link: value });
            }

            return {
                ...prevFormData,
                links: updatedLinks
            };
        });
        
        setResumeInfo((prevResumeInfo) => {
            const updatedLinks = [...prevResumeInfo.links];
            const existingIndex = updatedLinks.findIndex(link => link.name === linkType);

            if (existingIndex > -1) {
                updatedLinks[existingIndex].link = value;
            } else {
                updatedLinks.push({ name: linkType, link: value });
            }

            return {
                ...prevResumeInfo,
                links: updatedLinks
            };
        });
    }

    useEffect(() => {
        if (resumeInfo) {
            setFormData({
                firstName: resumeInfo.firstName || '',
                lastName: resumeInfo.lastName || '',
                jobTitle: resumeInfo.jobTitle || '',
                address: resumeInfo.address || '',
                number: resumeInfo.number || '',
                email: resumeInfo.email || '',
                links: resumeInfo.links || []
            });
        }
    }, [resumeInfo]);

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: {
                ...formData,
                links: formData.links
            }
        };

        console.log("formData in line 46", formData);
        console.log(params.resumeid);

        GlobalAPI.updateResumeDetail(params.resumeid, data)
            .then(resp => {
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
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 max-w-2xl mx-auto'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Get Started with basic information</p>
            <div className="">
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
                        <div className='mt-3'>
                            <a href='#' onClick={() => setOpenLinks(!openLinks)}>Add Links?</a>
                            {openLinks && (
                                <div className='grid grid-cols-2 gap-3 text-sm mt-3'>
                                    <div>
                                        <label>Paste LinkedIn URL</label>
                                        <Input
                                            value={formData.links.find(link => link.name === 'LinkedIn')?.link || ''}
                                            onChange={(e) => handleLinkChange(e, 'LinkedIn')}
                                            type='text'
                                        />
                                    </div>
                                    <div>
                                        <label>Paste GitHub URL</label>
                                        <Input
                                            value={formData.links.find(link => link.name === 'GitHub')?.link || ''}
                                            onChange={(e) => handleLinkChange(e, 'GitHub')}
                                            type='text'
                                        />
                                    </div>
                                    <div>
                                        <label>Paste Website URL</label>
                                        <Input
                                            value={formData.links.find(link => link.name === 'Website')?.link || ''}
                                            onChange={(e) => handleLinkChange(e, 'Website')}
                                            type='text'
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='mt-3 flex justify-end'>
                            <Button
                                disabled={loading}
                                type="submit">{loading ? <LoaderCircle className='animate-spin' /> : 'Save'}</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PersonalDetails;