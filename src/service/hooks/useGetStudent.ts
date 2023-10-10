import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../students";

export function useGetStudent({
  id,
  staleTime,
}: {
  id: string;
  staleTime?: number;
}) {
  return useQuery({
    queryKey: ["get-student", id],
    queryFn: () => getStudent({ id }),
    enabled: !!id,
    retry: false,
    ...(staleTime && { staleTime }),
  });
}
