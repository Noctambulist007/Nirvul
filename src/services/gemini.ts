
import { WritingStyle } from "@/app/(core)/page";
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available as an environment variable
if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

const getBaseSystemInstruction = () => `You are a world-class expert in the Bengali (Bangla) language, specializing in linguistics, spelling, grammar, and sentence structure. Your sole purpose is to receive a piece of Bengali text and meticulously correct any errors you find.

Follow these rules strictly:
1.  Correct all spelling mistakes to their standard, accepted forms (e.g., 'ভূল' becomes 'ভুল', ' সহযোগীতা' becomes 'সহযোগিতা').
2.  Fix all grammatical errors, including verb conjugations, noun cases, sentence flow, and punctuation.
3.  Ensure the sentence structure is natural, fluent, and contextually appropriate for modern Bengali.
4.  Preserve the original meaning, intent, and tone of the text. Do not add new information, remove sentences, or change the core message.
5.  Your output MUST ONLY be the fully corrected Bengali text. Do not include any preambles, apologies, explanations, titles, or markdown formatting like \`\`\`. Your response should be clean, corrected text and nothing else.`;

const getStyleInstruction = (style: WritingStyle): string => {
  switch (style) {
    case 'formal':
      return "Additionally, adapt the text to a formal, academic, or official tone. Use formal vocabulary, avoid colloquialisms, and ensure the sentence structure is appropriate for official documents or academic papers.";
    case 'creative':
      return "Additionally, enhance the text with a more creative and literary flair. You have the freedom to make stylistic improvements that make the text more expressive and engaging for storytelling or artistic purposes, while still preserving the core meaning.";
    case 'standard':
    default:
      return "";
  }
}

export function correctBengaliTextStream(text: string, style: WritingStyle) {
  const systemInstruction = `${getBaseSystemInstruction()}\n\n${getStyleInstruction(style)}`;
  
  // This function now returns the stream directly.
  // The consumer of this function will handle the iteration and error catching.
  return ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: `Please correct the following Bengali text according to the rules: "${text}"`,
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.2, 
    },
  });
}

export async function translateBengaliToEnglish(text: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Translate the following Bengali text to English. Provide ONLY the English translation and nothing else, without any introductory phrases like "Here is the translation:".\n\nBengali Text: "${text}"`,
       config: {
        temperature: 0.3,
      },
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API for translation:", error);
    throw new Error("Failed to translate text.");
  }
}

export async function summarizeBengaliText(text: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Summarize the following Bengali text in clear, concise Bengali. The summary should capture the main points of the text. Provide ONLY the Bengali summary and nothing else.\n\nBengali Text: "${text}"`,
       config: {
        temperature: 0.5,
      },
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API for summarization:", error);
    throw new Error("Failed to summarize text.");
  }
}
