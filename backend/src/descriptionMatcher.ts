// match the description with extracted details of resume and return feedback
import openai from "./openAI";

export const analyzeResume = async (resumeText: string | null, jobDescription: string | null): Promise<any> => {
    const prompt = `Compare this resume with the job description.
    - Assign a similarity score (0-100)
    - List missing skills
    - Provide improvement suggestions

    Resume:
    ${resumeText}

    Job Description:
    ${jobDescription}

    Output as JSON format.`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: "You are a professional who analyzes resumes for job matching." }, { role: "user", content: prompt }],
        temperature: 0.5,
        max_tokens: 500
    });
    if (!response.choices[0].message.content) {
        throw new Error("No response from OpenAI");
    }
    return JSON.parse(response.choices[0].message.content);
};

export default analyzeResume;