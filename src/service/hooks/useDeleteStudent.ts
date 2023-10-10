import { useMutation } from "@tanstack/react-query";
import { deleteStudente } from "../students/delete";

export const useDeleteStudent = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) => deleteStudente({ id }),
  });
