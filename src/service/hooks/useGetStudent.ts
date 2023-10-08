import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../students";

export function useGetStudent({
  id,
  staleTime,
  withSchedules,
}: {
  id: string;
  staleTime?: number;
  withSchedules?: boolean;
}) {
  return useQuery({
    queryKey: ["get-student", id],
    queryFn: () => getStudent({ id, withSchedules }),
    enabled: !!id,
    retry: false,
    ...(staleTime && { staleTime }),
  });
}
