import { getSchedulesPerStudent } from "@/src/service/schedules";
import { useQuery } from "@tanstack/react-query";

export function useGetSchedulesPerStudent(
  studentId?: string,
  staleTime?: number
) {
  return useQuery({
    queryKey: ["get-schedules-per-student", studentId],
    queryFn: () => getSchedulesPerStudent(String(studentId)),
    enabled: !!studentId,
    retry: false,
    ...(staleTime && { staleTime }),
  });
}
