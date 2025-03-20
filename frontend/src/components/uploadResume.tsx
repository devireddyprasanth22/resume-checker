import * as React from "react";
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
    flexWrap: 'wrap'
};

export default function UploadBox() {
    const [filename, setfilename] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        console.log(event.target.files);
        if (file) {
            setfilename(file.name);
            setFile(file)
        }
    }

    const handleFileUpload = async() => {
        if(!file){
            console.error("no file selected")
            return;
        };
        const formData = new FormData();
        formData.append('resume', file);
        try {
            const response = await axios.post('http://localhost:5001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("reached this line",response)

        } catch (error) {
            console.error("file upload error:", error)
        }

    };
    return (
        <div>
            <Box component='section' sx={boxStyling}>
                <Button variant="contained" component='label'>Add File<input type='file' hidden  onChange={handleFileChange}/></Button>
                <p>or drag and drop here</p>
            </Box>
            {filename && 
            <div> 

            <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', padding: '10px'}}>
                <p>{filename}</p> 
                    <DeleteIcon style={{cursor: 'pointer'}} onClick={() => {
                setfilename("");
                setFile(null);
            }} />
            </div>
            <Button variant="contained" endIcon={<CloudUploadIcon></CloudUploadIcon>} onClick={handleFileUpload}>Upload</Button>
            </div>
            }
        </div>

    );
}