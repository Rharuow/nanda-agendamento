import { useQuery } from "@tanstack/react-query";
import { listSchedules } from "../schedules";

export function useSchedules(staleTime?: number) {
  return useQuery({
    queryKey: ["list-schedules"],
    queryFn: () => listSchedules(),
    retry: false,
    ...(staleTime && { staleTime }),
  });
}
