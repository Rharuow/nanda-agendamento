import { useMutation } from "@tanstack/react-query";
import { Patient } from "../..";
import { deleteSchedule } from "../../patients/schedules/delete";

export const useDeleteSchedule = () => {
  return useMutation({
    mutationFn: ({ id, patient }: { id: number; patient: Patient }) =>
      deleteSchedule({ id, patient }),
  });
};
