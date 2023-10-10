import { getStudentByName } from "@/src/service/students";
import { useQuery } from "@tanstack/react-query";

export function useGetStudentByName(name?: string, staleTime?: number) {
  return useQuery({
    enabled: !!name && name !== null && name !== undefined,
    queryKey: ["get-student", name],
    queryFn: () => getStudentByName({ name: String(name) }),
    retry: false,
    ...(staleTime && { staleTime }),
  });
}
