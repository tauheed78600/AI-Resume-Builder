import { Linkedin, Github, Mail, Phone } from 'lucide-react'; // Import more icons as needed
import React from 'react';

function PersonalDetailPreview({ resumeInfo }) {
    console.log("resumeinfo in personal details preview", resumeInfo);

    return (
        <div>
            {/* Name and Title */}
            <h2
                className='font-bold text-xl text-center'
                style={{
                    color: resumeInfo?.themeColor,
                }}
            >
                {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h2>
            <h2 className='text-center text-sm font-medium'>{resumeInfo?.jobTitle}</h2>
            <h2
                className='text-center font-normal text-xs'
                style={{
                    color: resumeInfo?.themeColor,
                }}
            >
                {resumeInfo?.address}
            </h2>

            {/* Contact Info */}
            <div className='flex justify-between'>
                <h2
                    className='font-normal text-xs'
                    style={{
                        color: resumeInfo?.themeColor,
                    }}
                >
                    <Phone className="inline-block w-4 h-4 mr-1" />
                    {resumeInfo?.number}
                </h2>
                <h2
                    className='font-normal text-xs'
                    style={{
                        color: resumeInfo?.themeColor,
                    }}
                >
                    <Mail className="inline-block w-4 h-4 mr-1" />
                    {resumeInfo?.email}
                </h2>
            </div>

            {/* Links Section */}
            <div className='mt-2 flex justify-center space-x-4'>
                {/* LinkedIn */}
                {resumeInfo?.links.map((lin=>{
                    {lin.link   }
                }))}

                {/* Add other social media links similarly */}
            </div>

            <hr
                className='border-[1.5px] my-1'
                style={{
                    borderColor: resumeInfo?.themeColor,
                }}
            />
        </div>
    );
}

export default PersonalDetailPreview;
