import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  const reqPromptText: string =
    (await req.json()) || "popular random animated fairy tale character";
  const promptText = `Create a coloring page for kids, with ${reqPromptText}, it will be most likely a character from a animated fairy tale, the outlines should be black, the rest is white, the image have to be black and white, fill the whole page`;

  const input = {
    prompt: promptText,
    aspect_ratio: "3:4",
    output_format: "jpg",
    output_quality: 80,
    safety_tolerance: 2,
    prompt_upsampling: true,
  };

  const prediction = await replicate.predictions.create({
    model: "black-forest-labs/flux-1.1-pro",
    input,
  });

  let latest = await replicate.predictions.get(prediction.id);
  // { "id": "xyz...", "status": "processing", ... }
  while (!["succeeded", "failed", "canceled"].includes(latest.status)) {
    latest = await replicate.predictions.get(prediction.id);
    // Wait for 2 seconds and then try again.
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  const { id, output, error, status } = latest;

  const responseObj = {
    id,
    inputText: reqPromptText,
    url: output,
    error,
    status,
  };

  return NextResponse.json(responseObj, { status: 200 });
}
