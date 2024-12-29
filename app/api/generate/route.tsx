import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import config from "@/config";
import { blurImage } from "@/app/utils/blurImage";
import { cookies } from "next/headers";
import { updateCustomersImages } from "@/app/utils/updateCustomersImages";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

/**
 * POST endpoint to generate an image based on a prompt and returns a blurred version.
 * 1. Checks if the user's image generation limit has been reached.
 * 2. Sends a request to Replicate's API to generate an image based on the provided prompt.
 * 3. The generated image is then blurred and returned to the client.
 * 4. The original image URL is stored in the user's metadata for future use.
 */

export async function POST(req: NextRequest) {
  try {
    const { prompt, imagesNum } = await req.json();
    const cookieStore = await cookies();
    const customerId = cookieStore.get("customerId")?.value as string;
    if (!customerId)
      return NextResponse.json(
        {},
        { status: 400, statusText: "Brak klienta!" }
      );
    //if limit of images on client reached, return error
    if (imagesNum >= config.IMAGE_LIMIT)
      return NextResponse.json(
        {},
        { status: 400, statusText: "Limit of images reached" }
      );

    const reqPromptText: string =
      prompt || "popular random animated fairy tale character";
    // const promptText = `Create a page for kids, with ${reqPromptText}, the image shoud have only the black outlines and white filling, black and white image with sharp and thick edges, fill the whole page`;
    const promptText = `Create black and white page with ${reqPromptText}. The image should only consist of black outlines and white interiors, suitable for coloring. Use thick and sharp edges to make it easy for kids to color. Ensure the design fills the entire page.`;

    const prediction = await replicate.predictions.create({
      model: "black-forest-labs/flux-1.1-pro",
      input: {
        prompt: promptText,
        aspect_ratio: "3:4",
        output_format: "jpg",
        output_quality: 80,
        safety_tolerance: 2,
        prompt_upsampling: true,
      },
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
    const { base64Image: blurredUrl, error: blurError } = await blurImage(
      output
    );
    //if blur applied correctly update customer's metadata with original url
    if (blurError) throw new Error(blurError.toString());
    await updateCustomersImages(customerId, output);

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
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500, statusText: (error as string) || "Internal Serever Error" }
    );
  }
}
