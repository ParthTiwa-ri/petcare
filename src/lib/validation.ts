import { z } from "zod";
import { DEFAULT_PET_IMG } from "./constants";

export const petIdSchema = z.string().cuid();

export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }).max(100),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .max(100),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Image url must be valid url" }),
    ]),
    age: z.coerce.number().int().positive().max(1000),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMG,
  })); //transform work with onsubmit just left here for learning purpose

export type TPetForm = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type TAuthForm = z.infer<typeof authSchema>;
