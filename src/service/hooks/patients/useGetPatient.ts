import { useQuery } from "@tanstack/react-query";
import { getPatient } from "../../patients/get";

export function useGetPatient({
  id,
  staleTime,
}: {
  id: string;
  staleTime?: number;
}) {
  return useQuery({
    queryKey: ["get-patient", id],
    queryFn: () => getPatient({ id }),
    enabled: !!id,
    retry: false,
    ...(staleTime && { staleTime }),
  });
}
