import * as React from "react";
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from "@mui/material/Button";
import { useState } from "react";
import { Typography } from "@mui/material";


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
    const [filename, setfilename] = useState("")

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setfilename(file.name);
        }
        console.log(file)
    }
    return (
        <div>
            <Box component='section' sx={boxStyling}>
                <Button variant="contained" component='label' endIcon={<CloudUploadIcon></CloudUploadIcon>} >Upload <input type='file' hidden onChange={handleFileChange}/></Button> 
                <p>or drag and drop here</p>
            </Box>

            {filename && <p>The document uploaded is {filename}</p>}
        </div>

    );
}