import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app this comes from env

export const generateRecipeSuggestion = async (pantryItems: string[]) => {
  if (!apiKey) {
    // Return a mock if no API key is present to prevent crashing in demo without env
    return new Promise<{title: string, content: string}>((resolve) => {
        setTimeout(() => {
            resolve({
                title: "Mock: Spicy Peanut Noodles",
                content: "Combine ramen noodles (cooked), peanut butter, soy sauce, and chili flakes. Top with a fried egg. Ready in 8 minutes!"
            });
        }, 1500);
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      I have the following ingredients in my college dorm pantry: ${pantryItems.join(', ')}.
      Suggest a single creative, cheap, and fast recipe I can make using mostly these ingredients.
      It should be suitable for a microwave or simple hot plate.
      Return JSON with keys: "title" (string) and "content" (short description under 50 words).
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    return JSON.parse(text) as { title: string, content: string };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
