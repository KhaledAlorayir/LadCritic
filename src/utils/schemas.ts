import { z } from "zod";

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

const gameSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  released: z.string().nullable().optional(),
  genres: z.array(genreSchema),
  background_image: z.string().url().nullable().optional(),
});

export const createReviewSchema = z.object({
  review: z.object({
    body: z.string().min(3).max(5000),
    rating: z.number().min(0).max(5),
  }),
  game: gameSchema,
});
