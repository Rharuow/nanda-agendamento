import { useQuery } from "@tanstack/react-query";
import { FilterType } from "../../patients/schedules/types";
import { listSchedules } from "../../patients/schedules/list";

export function useSchedules(filter?: FilterType, staleTime?: number) {
  return useQuery({
    queryKey: ["list-schedules-patients"],
    queryFn: () => listSchedules(filter),
    retry: false,
    ...(staleTime && { staleTime }),
  });
}
