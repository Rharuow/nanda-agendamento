import { useMutation } from "@tanstack/react-query";
import { createScheduling } from "../schedules";
import { FormCreateScheduling } from "@/src/components/domain/Scheduling";

export const useCreateSchedule = () => {
  return useMutation({
    mutationFn: (data: FormCreateScheduling) => createScheduling(data),
  });
};
