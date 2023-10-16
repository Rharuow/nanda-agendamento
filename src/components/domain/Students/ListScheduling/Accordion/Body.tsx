import { Text } from "@/src/components/Text";
import { Toggle } from "@/src/components/form/Toggle";
import { Schedule, Student } from "@/src/service";
import dayjs from "dayjs";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export const Body = ({
  schedule,
  onClickToogle,
}: {
  schedule: Schedule & { student: Student; position: number };
  onClickToogle: (scheduleId: number) => void;
}) => {
  const methods = useForm<{ paid: boolean }>({
    defaultValues: {
      paid: schedule.paid,
    },
  });

  return (
    <div className="flex flex-col bg-slate-500/30 rounded px-2 py-1">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2">
          <div className="flex justify-center">
            <Text className="font-bold">Pago?</Text>
          </div>
          <div className="flex justify-center">
            <FormProvider {...methods}>
              <Toggle
                name="paid"
                onClick={() => onClickToogle(schedule.position)}
              />
            </FormProvider>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex justify-center">
            <Text className="font-bold">Horário(s)</Text>
          </div>
          <div className="flex justify-center">
            <Text>{schedule.amountTime}</Text>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex justify-center">
            <Text className="font-bold">Dia da semana</Text>
          </div>
          <div className="flex justify-center">
            <Text>
              {dayjs(schedule.date)
                .toDate()
                .toLocaleString("pt-BR", { weekday: "long" })
                .charAt(0)
                .toLocaleUpperCase() +
                dayjs(schedule.date)
                  .toDate()
                  .toLocaleString("pt-BR", { weekday: "long" })
                  .slice(1)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
