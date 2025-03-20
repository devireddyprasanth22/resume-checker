import * as React from "react";
import express from "express";
import multer from "multer";

const app = express();
const port = 5000;


app.post('/upload', (req, res) => {
    try {

    }
    catch (error) {
        console.error("file upload error:", error)
    };
});