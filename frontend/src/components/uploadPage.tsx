import { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import './App.css'
import UploadBox from './uploadResume'
import JobDescription from './jobDescription'
import axios from "axios";
import Button from "@mui/material/Button";

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!file || !jobDescription) {
      alert("Please fill in the job description and upload your resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await axios.post("http://localhost:5001/upload", formData);
      navigate("/analysed", { state: { responseData: response.data } })
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

export default UploadPage;