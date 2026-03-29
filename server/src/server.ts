import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Hono } from "hono";
import { getUser } from "./db";
import { appRouter } from "./trpc";

const app = new Hono();

app.all("/trpc/*", (c) =>
  fetchRequestHandler({
    endpoint: "/trpc",
    req: c.req.raw,
    router: appRouter,
  })
);

app.get("/api/user/:id", async (c) => {
  const userId = +c.req.param("id");
  const user = await getUser(userId);

  return c.json(user);
});

export default app;
