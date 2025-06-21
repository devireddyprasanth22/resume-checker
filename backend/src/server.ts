import express from "express";
import multer from "multer";
import cors from "cors";
import resumeExtractor from "./resumeExtractor";
import analyzeResume from "./descriptionMatcher";
import { stat } from "fs";

const app = express();
const port = 5001;

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST"],
}));

const upload = multer({
    dest: 'uploads/'
});
let recentJD:string |null = null;
let recentText:string |null = null;
app.use('/uploads', express.static('uploads'));
app.post('/uploads', upload.single("resume"),async (req, res) => {
    try {
        const JobDescription = req.body.jobDescription;
        const text = await resumeExtractor(req.file?.path || "");
        recentJD = JobDescription;
        recentText = text;
        res.status(200).send("File uploaded successfully");
    }
    catch (error) {
        console.error("file upload error:", error)
        res.status(500).send("Error processing the file");
    };
});
app.get('/stream', async(req, res) => {
    if (!recentJD || !recentText) {
        res.status(400).send("No recent job description or resume text available");
        return;
    }
        // Set CORS and SSE headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    try {
        await analyzeResume(recentText, recentJD, res);
    }
    catch (error) {
        console.error("Error during analysis:", error);
        res.status(500).send("Error processing the resume analysis");
    }
    recentText = null; 
    recentJD = null; 

});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
