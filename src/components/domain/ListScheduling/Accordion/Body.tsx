import { Text } from "@/src/components/Text";
import { Toggle } from "@/src/components/form/Toggle";
import { Schedule, Student } from "@/src/service";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export const Body = ({
  schedule,
  onClickToogle,
}: {
  schedule: Schedule & { student: Student };
  onClickToogle: (scheduleId: string) => void;
}) => {
  const methods = useForm<{ paid: boolean }>({
    defaultValues: {
      paid: schedule.paid,
    },
  });

  return (
    <div className="flex flex-col bg-slate-500/30 rounded px-2 py-1">
      <div className="flex justify-around">
        <Text className="font-bold">Pago?</Text>
        <FormProvider {...methods}>
          <Toggle name="paid" onClick={() => onClickToogle(schedule.id)} />
        </FormProvider>
      </div>
    </div>
  );
};
