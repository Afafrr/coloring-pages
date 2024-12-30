import sharp from "sharp";
import { Metadata } from "sharp";

/**
 * Blurs an image with given url and overlays a watermark.
 * The blurred image is returned as a base64-encoded JPEG string.
 *
 * @param {string} imageUrl
 * @returns {Promise<{ base64Image?: string; error?: unknown }>}
 */

export async function blurImage(
  imageUrl: string
): Promise<{ base64Image?: string; error?: unknown }> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok)
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    const imageBuffer = await response.arrayBuffer();
    //get image metadata
    const metadata = await sharp(Buffer.from(imageBuffer)).metadata();
    //adjust svg to img
    const svg = getSVG(metadata);
    //apply a blur effect and text to a buffer
    const blurredBuffer = await sharp(imageBuffer)
      .webp({ quality: 30 })
      .blur(7)
      .composite([
        {
          input: Buffer.from(svg),
          gravity: "center",
        },
      ])
      .toBuffer();
    //create data url from encoded image
    const blurredImage = blurredBuffer.toString("base64");
    const base64Image = `data:image/jpeg;base64,${blurredImage}`;
    return { base64Image };
  } catch (error) {
    return { error };
  }
}

//creating watermark SVG
function getSVG(metadata: Metadata): string {
  const watermarkText = "kolorowanki.art";
  const svgWidth = metadata.width || 600;
  const svgHeight = metadata.height || 600;

  const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
          <style>
            .watermark {
              display:block;
              font-size: 130px;
              font-weight: bold;
              fill: rgba(0, 0, 0, 0.8);
              font-family: Arial, sans-serif;
              text-anchor: middle;
              filter: drop-shadow(2px 2px 20px #fff);
            }
          </style>
          <text x="60%" y="50%" class="watermark" transform="rotate(-45 ${
            svgWidth / 2
          } ${svgHeight / 2})">
            ${watermarkText}
          </text>
        </svg>
    `;
  return svg;
}
