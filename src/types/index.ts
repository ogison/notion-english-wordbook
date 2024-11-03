import { z } from "zod";

export type WORD = {
  id: string;
  word: string;
  meaning: string;
  example: string;
  status: string;
  type: string;
};

export type NEWWORD = {
  word: string;
  meaning: string;
  example?: string;
};

export const formSchema = z.object({
  word: z.string().nonempty("Word is required"),
  meaning: z.string().nonempty("Meaning is required"),
  example: z.string().optional(),
});
