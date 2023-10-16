import { useMutation } from "@tanstack/react-query";
import { FormCreateScheduling } from "@/src/components/domain/Patients/Schedules/New";
import { createScheduling } from "../../patients/schedules/create";

export const useCreateSchedule = () => {
  return useMutation({
    mutationFn: (data: FormCreateScheduling) => createScheduling(data),
  });
};
