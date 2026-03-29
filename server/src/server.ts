import { Hono } from "hono";
import { fileURLToPath, SQL } from "bun";
import z from "zod";

const dbPath = fileURLToPath(import.meta.resolve("../../db/data.sqlite"));
const sql = new SQL({ adapter: "sqlite", filename: dbPath, create: true });

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().nullable(),
});

async function getUser(userId: number) {
  const rows = await sql`
    SELECT *
    FROM "user"
    WHERE id = ${userId}
    LIMIT 1
  `;

  const parsed = z.array(UserSchema).parse(rows);
  return parsed[0] ? parsed[0] : null;
}

const app = new Hono();

app.get("/api/user/:id", async (c) => {
  const userId = +c.req.param("id");
  const user = await getUser(userId);

  return c.json(user);
});

export default app;
