import { useMutation } from "@tanstack/react-query";
import { createScheduling } from "../../students/schedules";
import { FormCreateScheduling } from "@/src/components/domain/Students/Scheduling";

export const useCreateSchedule = () => {
  return useMutation({
    mutationFn: (data: FormCreateScheduling) => createScheduling(data),
  });
};
