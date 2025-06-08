import * as React from "react";
import express from "express";
import multer from "multer";
import cors from "cors";
import resumeExtractor from "./resumeExtractor";
import analyzeResume from "./descriptionMatcher";

const app = express();
const port = 5001;

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST"],
}));

const upload = multer({
    dest: 'uploads/'
});
let recentFeedback:JSON |null = null;
app.use('/uploads', express.static('uploads'));
app.post('/uploads', upload.single("resume"),async (req, res) => {
    try {
        const JobDescription = req.body.jobDescription;
        const text = await resumeExtractor(req.file?.path || "");
        const feedback = await analyzeResume(text, JobDescription);
        console.log(feedback);
        recentFeedback = feedback;
        res.send(feedback);
    }
    catch (error) {
        console.error("file upload error:", error)
    };
});
app.get('/uploads', async(req, res) => 
{
    if (recentFeedback) {
        res.json(recentFeedback);
    } else {
        res.status(404).json({ error: "No feedback available yet" });
    }
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});