import { Button } from "@/src/components/Button";
import { Text } from "@/src/components/Text";
import { Schedule, Student } from "@/src/service";
import React from "react";

export const Body = ({
  student,
}: {
  student: Student & { schedules: Array<Schedule> };
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Text>Quantidade de totais aulas:</Text>
          <Text>
            {student.schedules.reduce(
              (accumulator, current) =>
                accumulator + Number(current.amountTime),
              0
            )}
          </Text>
        </div>
        <div className="flex justify-between">
          <Text>Quantidade de aulas não pagas:</Text>
          <Text>
            {student.schedules
              .filter((schedule) => !schedule.paid)
              .reduce(
                (accumulator, current) =>
                  accumulator + Number(current.amountTime),
                0
              )}
          </Text>
        </div>
      </div>
      {student.schedules.some((schedule) => !schedule.paid) && (
        <div className="flex flex-col gap-2 border-t-2 pt-2">
          <div className="flex justify-end">
            <Button text="Gerar Recibo" className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
};
