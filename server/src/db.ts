import { fileURLToPath, SQL } from "bun";
import z from "zod";

const dbPath = fileURLToPath(import.meta.resolve("../../db/data.sqlite"));
const sql = new SQL({ adapter: "sqlite", filename: dbPath, create: true });

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().nullable(),
});

export async function getUser(userId: number) {
  const rows = await sql`
    SELECT *
    FROM "user"
    WHERE id = ${userId}
    LIMIT 1
  `;

  const parsed = z.array(UserSchema).parse(rows);
  return parsed[0] ? parsed[0] : null;
}
