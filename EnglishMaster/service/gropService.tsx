import { GROP_API_KEY } from '@/expo-env'
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: GROP_API_KEY });

export const getGroqResponse = async (query: string): Promise<String> => {
  try {
    const chatCompletion = await getGroqChatCompletion(query);
    console.log(chatCompletion.choices[0]?.message?.content || "");
    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error fetching Groq response:", error);
    return "Error fetching response";
  }
};

export async function getGroqChatCompletion(query: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}