import { useQuery } from "@tanstack/react-query";
import { listPatients } from "../../patients/list";

export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: () => listPatients(),
  });
};
