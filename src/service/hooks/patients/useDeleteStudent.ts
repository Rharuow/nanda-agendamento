import { useMutation } from "@tanstack/react-query";
import { deletePatient } from "../../patients/delete";

export const useDeletePatient = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) => deletePatient({ id }),
  });
