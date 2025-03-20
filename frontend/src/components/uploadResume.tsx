import * as React from "react";
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";

const boxStyling = {
    p: { xs: 2, sm: 4, md: 6 }, 
    border: "1px dashed grey", 
    width: { xs: "90%", sm: "80%", md: "500px" }, 
    height: { xs: '50%', sm: '35%', md: '250px' }, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: "center", 
    flexDirection: 'column',
    boxShadow: "0px 0px 50px 10px rgba(107, 107, 107, 0.1)",
    flexWrap:'wrap'
};

export default function UploadBox() {
    const [filename, setfilename] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) return;
        const file = event.target.files[0];
        console.log(event.target.files);
        if (file) {
            setfilename(file.name);
            const formData = new FormData();
            formData.append('resume', file);
            try{
                const response = axios.post('http://localhost:5001/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total){

                            setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                        }else{
                            setUploadProgress(0);
                            console.log("unable to compute progress as data length is not available");
                        }
                    }
                });
                console.log(response)

            } catch (error) {
                console.error("file upload error:", error)
            }
        }
        console.log(file)
    }
    return (
        <div>
            <Box component='section' sx={boxStyling}>
                <Button variant="contained" component='label' endIcon={<CloudUploadIcon></CloudUploadIcon>} >Upload <input type='file' hidden onChange={handleFileChange}/></Button> 
                <p>or drag and drop here</p>
            </Box>
            {filename && <div style={{display:'flex',alignItems:'flex-start', flexDirection:'column', width:'`100%', padding:'5px'}}> <p>{filename}</p> <div style={{ display:'flex', width:'100%', alignItems:'center'}}><LinearProgress variant="determinate" value={uploadProgress} style={{width:'80%', flex:1}} /> <DeleteIcon style={{ marginLeft:'10%', cursor:'pointer'}} onClick={()=> {
                setfilename("");
                setUploadProgress(0);
            }}/></div></div>}
            
        </div>

    );
}