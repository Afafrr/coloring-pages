import { Status } from "replicate";

export type AiResponse = {
  id: string;
  inputText: string;
  url: string;
  error: unknown;
  status: Status;
};
//one image card data
export type ImageObj = {
  id: string;
  url: string;
  inputText: string;
};

/**
 * Status of purchase in customers metadata, false stands for not purchased
 */
export type CustomerMetaStatus = "success" | "failed" | "false";
