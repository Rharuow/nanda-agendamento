import { getStudentByName } from "@/src/service/students";
import { useQuery } from "@tanstack/react-query";

export function useGetStudentByName(name: string, staleTime?: number) {
  return useQuery({
    queryKey: ["get-student", name],
    queryFn: () => getStudentByName({ name }),
    enabled: !!name,
    retry: false,
    ...(staleTime && { staleTime }),
  });
}
