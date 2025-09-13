import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function editImageWithPrompt(
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    
    // Fallback if no image is returned but text is
    const textResponse = response.text;
    if (textResponse) {
        throw new Error(`API returned a text response instead of an image: ${textResponse}`);
    }

    throw new Error('No image data found in the API response.');
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if(error instanceof Error && error.message.includes("429")) {
      throw new Error("API rate limit exceeded. Please try again later.");
    }
    throw new Error(`Failed to edit image. ${error instanceof Error ? error.message : ''}`);
  }
}

export async function enhancePrompt(prompt: string): Promise<string> {
    try {
        const systemInstruction = "You are a professional photographer, fashion designer, and a highly creative person. Your task is to enhance the following prompt for an AI image generator. Make it more vivid, descriptive, and artistic. Expand on the details of the clothing, the setting, the lighting, and the overall mood. Do not change the core subject (the woman, her ethnicity, her pose) or the main clothing item and location. Only return the enhanced prompt text, nothing else. Here is the prompt to enhance:";
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${systemInstruction}\n\n"${prompt}"`,
        });

        const enhancedPrompt = response.text.trim();
        if (!enhancedPrompt) {
            throw new Error('API returned an empty response for prompt enhancement.');
        }
        return enhancedPrompt;
    } catch (error) {
        console.error("Error calling Gemini API for prompt enhancement:", error);
        if(error instanceof Error && error.message.includes("429")) {
            throw new Error("API rate limit exceeded. Please try again later.");
        }
        throw new Error(`Failed to enhance prompt. ${error instanceof Error ? error.message : ''}`);
    }
}
