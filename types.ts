import { Status } from "replicate";

export type AiResponse = {
  id: string;
  inputText: string;
  url: string;
  error: unknown;
  status: Status;
};

export type ImageObj = {
  id: string;
  url: string;
  inputText: string;
};
