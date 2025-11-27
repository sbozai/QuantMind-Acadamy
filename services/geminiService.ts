import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { UserContext } from '../types';

// Use gemini-3-pro-preview for complex reasoning and long-form content generation
const MODEL_NAME = 'gemini-3-pro-preview';

export const streamLessonContent = async (
  context: UserContext,
  onChunk: (text: string) => void
): Promise<void> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are an expert financial educator and quantitative analyst working at a top-tier hedge fund. 
    Your goal is to explain how hedge funds use Artificial Intelligence in stock trading to an intelligent beginner.
    
    Adhere strictly to the following constraints requested by the user:
    1. **Length:** Approximately 2,000 words (±10%).
    2. **Depth:** Explain machine learning models, NLP, alternative data, reinforcement learning, high-frequency trading (HFT), and portfolio optimization/risk modeling.
    3. **Citations:** Include citations for major concepts (e.g., "According to a 2020 paper by...").
    4. **Visuals:** Use clear ASCII diagrams to visually explain model pipelines and data flows.
    5. **Tone:** Intelligent beginner. Accessible but rigorous.
    6. **Structure:** Highly structured. Step-by-step breakdowns. Clear definitions before jargon.
    7. **Honesty:** If you do not know something, explicitly say "I don't know."
    
    Tailor your explanation based on the user's background:
    - Math Comfort: ${context.mathLevel}
    - Coding Experience: ${context.codingLevel}
    - Specific Interest: ${context.specificInterest || "General Overview"}
    
    If the user has advanced math skills, use more technical terms. If they are beginners, use analogies.
    Start with a clear, engaging introduction.
  `;

  const prompt = `
    Teach me how hedge funds use artificial intelligence in stock trading.
    Please begin the lesson now.
  `;

  try {
    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: systemInstruction,
        // Using a thinking budget to allow for better structure planning for the long essay
        thinkingConfig: { thinkingBudget: 4096 }, 
        temperature: 0.7,
      },
    });

    const resultStream = await chat.sendMessageStream({ message: prompt });

    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Error streaming content:", error);
    onChunk("\n\n**Error:** Failed to generate content. Please check your API key and try again.");
  }
};
