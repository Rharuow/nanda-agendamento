import { useQuery } from "@tanstack/react-query";
import { listSchedules } from "../schedules";
import { FilterType } from "../schedules/types";

export function useSchedules(filter?: FilterType, staleTime?: number) {
  return useQuery({
    queryKey: ["list-schedules"],
    queryFn: () => listSchedules(filter),
    retry: false,
    ...(staleTime && { staleTime }),
  });
}
