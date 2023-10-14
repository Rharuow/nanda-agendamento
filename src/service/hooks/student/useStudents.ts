import { listStudents } from "@/src/service/students";
import { useQuery } from "@tanstack/react-query";
import { FilterType } from "../../students/types";

export function useStudents(params?: {
  filter?: FilterType;
  staleTime?: number;
}) {
  return useQuery({
    queryKey: ["list-students"],
    queryFn: () => listStudents(params?.filter),
    ...(params?.staleTime && { staleTime: params.staleTime }),
  });
}
