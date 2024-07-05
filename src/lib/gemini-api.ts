"use server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function run(
  name: string,
  age: number,
  ownerName: string,
  notes: string
) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt1 = `give personalized advice in 1 and half line for pet care for a pet named ${name} who is ${age} years old, owned by ${ownerName}. ${notes}`;

  const result = await model.generateContent(prompt1);
  const response = await result.response;
  const text = response.text();
  return text;
}
