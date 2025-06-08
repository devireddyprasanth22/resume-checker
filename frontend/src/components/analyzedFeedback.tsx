import * as React from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

// Alternative syntax: export default function AnalyzedFeedback({feedback}: {feedback : JSON}){};
export default function AnalyzedFeedback() {
    const [feedback, setFeedback] = useState<JSON | null>(null);
    useEffect(() => {
        // Fetch feedback once when component mounts
        fetch("http://localhost:5001/uploads")
          .then(response => response.json())
          .then(data => {
            setFeedback(data);
          })
          .catch(error => console.error("Error fetching feedback:", error));
      },[]);
    return (
        <div>
            <Box sx={{ p: 2, border: "1px solid grey", width: "80%", margin: "auto", mt: 4 }}>
                <h2>Analyzed Feedback</h2>
                {feedback ? (
                    <pre>{JSON.stringify(feedback, null, 2)}</pre>
                ) : (
                    <p>Loading feedback...</p>
                )}
            </Box>
            <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
                Refresh Feedback
            </Button>
        </div>
    )
};