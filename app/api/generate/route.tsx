import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import config from "@/config";
import { blurImage } from "@/app/utils/blurImage";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// calls replicate with desired prompt and checks if user fits in limit
export async function POST(req: NextRequest) {
  try {
    const { prompt, imagesNum } = await req.json();
    //if limit of images on client reached, return error
    if (imagesNum >= config.IMAGE_LIMIT)
      return NextResponse.json({}, { status: 500, statusText: "Limit" });

    const reqPromptText: string =
      prompt || "popular random animated fairy tale character";
    const promptText = `Create a page for kids, with ${reqPromptText}, the image shoud have only the black outlines, white fill, black and white image with sharp and thick edges, fill the whole page`;

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
    //if different from starting/processing status
    while (!["succeeded", "failed", "canceled"].includes(latest.status)) {
      latest = await replicate.predictions.get(prediction.id);
      // Wait for 1 second and then try again.
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    const { id, output, status, error } = latest;

    //transform image to blurred
    const blurredUrl = await blurImage(output);

    const responseObj = {
      id,
      inputText: prompt,
      url: blurredUrl,
      error,
      status,
    };

    if (status === "failed" || status === "canceled")
      throw new Error(responseObj.error as string);

    return NextResponse.json(responseObj, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500, statusText: error || "Internal Serever Error" }
    );
  }
}
