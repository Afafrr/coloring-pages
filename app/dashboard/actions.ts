import { AiResponse } from "@/types";

export async function generateImage(
  prompt: string,
  imagesNum: number
): Promise<{ error: string; data: AiResponse | null }> {
  try {
    const response = await fetch("api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, imagesNum }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(response.statusText);

    return { error: "", data: data };
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    console.error(message, "asddddddddddddd");
    
    return { error: message, data: null };
  }
}
