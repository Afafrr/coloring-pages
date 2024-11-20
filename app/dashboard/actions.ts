import { AiResponse } from "@/types";

export async function generateImage(
  prompt: string
): Promise<{ error: string; data: AiResponse | null }> {
  try {
    const response = await fetch("api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prompt),
    });
    const data = await response.json();

    if (!response.ok) {
      const resText = await response.text();
      return { error: resText, data: null };
    }
    return { error: "", data: data };
  } catch (error: any) {
    console.error(error.message);
    return { error: error.message, data: null };
  }
}
