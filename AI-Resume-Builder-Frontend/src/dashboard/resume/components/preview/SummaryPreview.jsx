import React from 'react'

function SummaryPreview({resumeInfo, enablenext}) {

    console.log("resumeinfo in SummaryPreview", resumeInfo)
    return (
        <div>
            <h2 className='font-bold flex justify-center text-sm' >Career Objective</h2>
            <hr style={{
                borderColor:resumeInfo?.themeColor
            }} />
            <p className='text-xs'>
            {resumeInfo?.summary}
            
        </p>
        </div>
    )
}

export default SummaryPreview
