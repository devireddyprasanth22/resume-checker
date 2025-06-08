import * as React from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

// Alternative syntax: export default function AnalyzedFeedback({feedback}: {feedback : JSON}){};
export default function AnalyzedFeedback() {
    useEffect(() => {
        // Fetch feedback once when component mounts
        fetch("http://localhost:5001/feedback")
          .then(response => response.json())
          .then(data => {
          })
          .catch(error => console.error("Error fetching feedback:", error));
      },);

    return (
        <div>
        </div>
    )
};