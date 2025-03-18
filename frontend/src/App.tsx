import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadBox from './components/uploadResume'

function App() {

  return (
    <>
      <div>
        <h3> Upload your resume in the box below</h3>
      </div>
      <UploadBox/>
    </>
  )
}

export default App
