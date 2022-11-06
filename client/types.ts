export type ContentType = "text" | "image" | "video" | "audio";

export type HiddenContent = {
  id: string;
  type: ContentType;
  content: string;
  title: string;
  score: number;
};
