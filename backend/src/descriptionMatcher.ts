// match the description with extracted details of resume and return feedback
import openai from "./openAI";
import express from "express";

export const analyzeResume = async (resumeText: string | null, jobDescription: string | null, res: express.Response ): Promise<any> => {
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
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        stream:true,
        messages: [{ role: "system", content: "You are a professional who analyzes resumes for job matching." }, { role: "user", content: prompt }],
        temperature: 0.5,
        max_tokens: 500
    });
    response.on("data", (chunk) => {
        const data = chunk.toString();
        res.write(`data: ${data}\n\n`);
    })
    if (!response.choices[0].message.content) {
        throw new Error("No response from OpenAI");
    }
    return JSON.parse(response.choices[0].message.content);
};

export default analyzeResume;