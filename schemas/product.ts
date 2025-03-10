import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number().int().optional().nullable(),
  name: z.string().min(1, {
    message: "Name is requried",
  }),
  price: z
    .number()
    .min(0, { message: "Price cannot be negative" })
    .refine((val) => Number(val.toFixed(2)) === val, {
      message: "Price can have a maximum of 2 decimal places",
    }),
  stock: z
    .number()
    .int()
    .min(0, { message: "Stock cannot be negative" })
    .default(0),
  sold: z.number().int().min(0).default(0),
  updatedAt: z.date().optional(),
});
