import { useMutation } from "@tanstack/react-query";
import { updatePaid } from "../schedules/updatePaid";

export const useUpdatePaidSchedule = () => {
  return useMutation({
    mutationFn: (id: string) => updatePaid({ id }),
  });
};
