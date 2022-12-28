import { router } from "../trpc";
import { reviewRouter } from "./review";

export const appRouter = router({
  review: reviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
