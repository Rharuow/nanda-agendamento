import { useMutation } from "@tanstack/react-query";
import { deleteSchedule } from "../schedules/delete";
import { Student } from "..";

export const useDeleteSchedule = () => {
  return useMutation({
    mutationFn: ({ id, student }: { id: number; student: Student }) =>
      deleteSchedule({ id, student }),
  });
};
