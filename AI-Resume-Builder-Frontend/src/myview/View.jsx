import React from 'react'
import Header from '../components/custom/header'
import { Button } from '../components/ui/button'

function ViewResume() {
  return (
    <div>
      <Header/>
      <div className='my-10'>
        <h2 className='text-center text-2xl font-medium'>Congrats!! Your Resume is ready</h2>
        <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique 
                    resume url with your friends and family </p>
        <div>
            <Button>Download</Button>
            <Button>Share</Button>
        </div>
      </div>
    </div>
  )
}

export default ViewResume
