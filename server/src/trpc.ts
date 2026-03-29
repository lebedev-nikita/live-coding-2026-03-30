import { initTRPC } from "@trpc/server";
import z from "zod";
import { getUser } from "./db";

const { router, procedure } = initTRPC.create();

export const appRouter = router({
  getUser: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      return await getUser(input.id);
    }),
});

export type AppRouter = typeof appRouter;
