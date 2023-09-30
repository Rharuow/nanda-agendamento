import { listStudents } from "@/src/service/students";
import { useQuery } from "@tanstack/react-query";

export function useStudents(staleTime?: number) {
  return useQuery({
    queryKey: ["list-students"],
    queryFn: () => listStudents(),
    retry: false,
    ...(staleTime && { staleTime }),
  });
}
