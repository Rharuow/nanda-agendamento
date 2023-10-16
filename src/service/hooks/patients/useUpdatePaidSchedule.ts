import { useMutation } from "@tanstack/react-query";
import { Patient } from "../..";
import { updatePaid } from "../../patients/schedules/updatePaid";

export const useUpdatePaidSchedule = () => {
  return useMutation({
    mutationFn: ({ id, patient }: { id: number; patient: Patient }) =>
      updatePaid({ id, patient }),
  });
};
