import { useMutation } from "@tanstack/react-query";
import { deleteSchedule } from "../schedules/delete";

export const useDeleteSchedule = () => {
  return useMutation({
    mutationFn: (id: string) => deleteSchedule({ id }),
  });
};
