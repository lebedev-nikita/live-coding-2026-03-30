import { Hono } from "hono";
import { fileURLToPath, SQL } from "bun";

const dbPath = fileURLToPath(import.meta.resolve("../../db/data.sqlite"));
const sql = new SQL({ adapter: "sqlite", filename: dbPath, create: true });

async function getUser(userId: number) {
  const rows = await sql`
    SELECT *
    FROM "user"
    WHERE id = ${userId}
    LIMIT 1
  `;

  return rows[0];
}

const app = new Hono();

app.get("/api/user/:id", async (c) => {
  const userId = +c.req.param("id");
  const user = await getUser(userId);

  return c.json(user);
});

export default app;
