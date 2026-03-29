import { useState } from "react";
import { useUser } from "./hooks/api";

const randomInt = (max: number) => Math.floor(Math.random() * max);

export default function App() {
  const [userId, setUserId] = useState(0);

  const user = useUser(userId);

  return (
    <main style={{ textAlign: "left" }}>
      <button onClick={() => setUserId(randomInt(100))}>{userId}</button>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}
