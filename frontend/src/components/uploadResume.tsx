import * as React from "react";
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadBox() {
    return (
        <Box component='section' sx={{ p: { xs: 2, sm: 4, md: 6 }, border: "1px dashed grey", width: { xs: "90%", sm: "80%", md: "500px" }, height: { xs: '50%', sm: '35%', md: '250px' }, display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection:'column' }}>
            Upload <CloudUploadIcon></CloudUploadIcon> 
            </Box>
    );
}