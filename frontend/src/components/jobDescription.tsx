import * as React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Box } from "@mui/material";

export default function JobDescription() {
    return (
        <Box
            sx={{
                p: { xs: 2, sm: 4, md: 6 },
                border: "1px solid grey",
                width: { xs: "90%", sm: "80%", md: "500px" },
                height: { xs: "50vh", sm: "35vh", md: "250px" }, 
                display: "flex",
                overflow:'auto',
            }}
        >
            <TextareaAutosize
                aria-label="job description"
                placeholder="Enter your job description here"
                style={{
                    width: "100%",  
                    height: "100%", 
                    resize: "none", 
                    fontSize: "16px",
                    border: "none", 
                    outline: "none", 
                    background: "transparent", 
                }}
            />
        </Box>
    );
}
