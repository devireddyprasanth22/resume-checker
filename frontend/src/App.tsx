import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadBox from './components/uploadResume'
import JobDescription from './components/jobDescription'
import axios from "axios";
import Button from "@mui/material/Button";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!file || !jobDescription) {
      alert("Please fill in the job description and upload your resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      await axios.post("http://localhost:5001/upload", formData);
    } catch (error) {
      console.error("File upload error:", error);
    }
  }

  return (
    <>
    <div>
       <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          <h3>Upload your resume in the box below</h3>
          <UploadBox setFile={setFile} />
        </div>

        <div style={{ flex: 1, marginLeft: '20px' }}>
          <h3>Fill in the job description</h3>
          <JobDescription setJobDescription={setJobDescription} />
        </div>
      </div>
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </div>
    </>
  )
}

export default App
