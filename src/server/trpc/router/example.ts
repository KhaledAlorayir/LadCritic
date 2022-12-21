import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure.input(z.string()).query(({ input }) => `${input}`),
});
