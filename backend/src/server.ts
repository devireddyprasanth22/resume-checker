import * as React from "react";
import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
const port = 5001;

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST"],
}));

const upload = multer({
    dest: 'uploads/'
});

app.post('/upload', upload.single("resume"),async (req, res) => {
    try {
        const JobDescription = req.body.jobDescription;
        console.log(JobDescription);
        console.log(req.file);
        res.send("file uploaded successfully");
    }
    catch (error) {
        console.error("file upload error:", error)
    };
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});