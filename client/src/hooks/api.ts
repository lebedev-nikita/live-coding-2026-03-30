import { trpc } from "../trpc";

export function useUser(userId: number) {
  const result = trpc.getUser.useQuery({ id: userId });

  const user = result.data;
  return user;
}
