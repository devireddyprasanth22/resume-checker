import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadBox from './components/uploadResume'
import JobDescription from './components/jobDescription'

function App() {

  return (
    <>
       <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        {/* Upload Resume Section */}
        <div style={{ flex: 1, marginRight: '20px' }}>
          <h3>Upload your resume in the box below</h3>
          <UploadBox />
        </div>

        {/* Job Description Section */}
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <h3>Fill in the job description</h3>
          <JobDescription />
        </div>
      </div>
    </>
  )
}

export default App
