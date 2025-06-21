import express from "express";
import openai from "./openAI";

export const analyzeResume = async (resumeText: string | null, jobDescription: string | null, res: express.Response): Promise<any> => {
    const prompt = `Compare this resume with the job description.
    - Assign a similarity score (0-100)
    - List missing skills
    - Provide improvement suggestions

    Resume:
    ${resumeText}

    Job Description:
    ${jobDescription}

    Respond **only** with valid JSON, without any markdown formatting or explanations. Format example:
    {
    "similarityScore": 85,
    "missingSkills": ["TypeScript"],
    "improvementSuggestions": ["Add more detail on React projects"]
    }`;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            stream: true,
            messages: [
                { role: "system", content: "You are a professional who analyzes resumes for job matching." },
                { role: "user", content: prompt }
            ],
            temperature: 0.5,
            max_tokens: 500
        });
    
        for await (const chunk of response) {
            const content = chunk.choices?.[0]?.delta?.content;
            if (content) {
                res.write(`data: ${content}\n\n`);
            }
        }
        res.write("data: [DONE]\n\n");
        res.end();
    } catch (error) {
        console.error("Error during OpenAI API call:", error);
        res.status(500).send("Error processing the resume analysis");

    }
}

export default analyzeResume;