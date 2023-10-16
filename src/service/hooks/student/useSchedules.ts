import { useQuery } from "@tanstack/react-query";
import { listSchedules } from "../../students/schedules";
import { FilterType } from "../../students/schedules/types";

export function useSchedules(filter?: FilterType, staleTime?: number) {
  return useQuery({
    queryKey: ["list-schedules-students"],
    queryFn: () => listSchedules(filter),
    retry: false,
    ...(staleTime && { staleTime }),
  });
}
