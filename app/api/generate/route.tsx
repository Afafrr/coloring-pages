import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import config from "@/config";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// calls replicate with desired prompt and checks if user fits in limit
export async function POST(req: NextRequest) {
  try {
    const { prompt, imagesNum } = await req.json();
    //if limit reached return error
    if (imagesNum >= config.IMAGE_LIMIT)
      return NextResponse.json({}, { status: 500, statusText: "Limit" });

    // const reqPromptText: string =
    //   prompt || "popular random animated fairy tale character";
    // const promptText = `Create a page for kids, with ${reqPromptText}, the image shoud have only the black outlines, don't color it, black and white image with sharp and thick edges, fill the whole page`;

    // const input = {
    //   prompt: promptText,
    //   aspect_ratio: "3:4",
    //   output_format: "jpg",
    //   output_quality: 80,
    //   safety_tolerance: 2,
    //   prompt_upsampling: true,
    // };

    // const prediction = await replicate.predictions.create({
    //   model: "black-forest-labs/flux-1.1-pro",
    //   input,
    // });

    // let latest = await replicate.predictions.get(prediction.id);
    // // { "id": "xyz...", "status": "processing", ... }
    // while (!["succeeded", "failed", "canceled"].includes(latest.status)) {
    //   latest = await replicate.predictions.get(prediction.id);
    //   // Wait for 1 second and then try again.
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    // }

    const latest = { id: 1, output: "asd", status: "failed" };
    const { id, output, status } = latest;
    const error = "ERRRRRRRRRRRRRRRRRRRR";
    const responseObj = {
      id,
      inputText: prompt,
      url: output,
      error,
      status,
    };
    if (status === "failed" || status === "canceled")
      throw new Error(responseObj.error);
    return NextResponse.json(responseObj, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500, statusText: error || 'Internal Serever Error' });
  }
}
