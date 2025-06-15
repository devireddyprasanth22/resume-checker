import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {useNavigate } from 'react-router-dom';

// Alternative syntax: export default function AnalyzedFeedback({feedback}: {feedback : JSON}){};
export default function AnalyzedFeedback() {
    const navigate = useNavigate();
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
        <motion.div
        initial={{ opacity: 0, y: 20 }}    
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}>
            <Box sx={{ p: 2, border: "1px solid grey", width: "100%", margin: "auto", mt: 4 }}>
                <h2>Analyzed Feedback</h2>
                {feedback ? (
                    <pre>{JSON.stringify(feedback, null, 2)}</pre>
                ) : (
                    <p>Loading feedback...</p>
                )}
            </Box>
            <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
                Return to Upload
            </Button>
        </motion.div>
    )
};