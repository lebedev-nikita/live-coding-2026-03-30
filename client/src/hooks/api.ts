import { useQuery } from "@tanstack/react-query";

export function useUser(userId: number) {
  const result = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await fetch(`/api/user/${userId}`);
      const user = await res.json();
      return user;
    },
  });

  const user = result.data;
  return user;
}
