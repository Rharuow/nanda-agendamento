import { useMutation } from "@tanstack/react-query";
import { updatePaid } from "../../students/schedules/updatePaid";
import { Student } from "../..";

export const useUpdatePaidSchedule = () => {
  return useMutation({
    mutationFn: ({ id, student }: { id: number; student: Student }) =>
      updatePaid({ id, student }),
  });
};
