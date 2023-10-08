import { Button } from "@/src/components/Button";
import { Text } from "@/src/components/Text";
import { Schedule, Student } from "@/src/service";
import { useRouter } from "next/navigation";
import React from "react";

export const Body = ({
  student,
}: {
  student: Student & { schedules: Array<Schedule> };
}) => {
  const { push } = useRouter();
  const handleNavigate = (id: string) => push(`/students/${id}/reciept`);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Text>Quantidade de totais aulas:</Text>
          <Text>
            {student.schedules?.reduce(
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
              ?.filter((schedule) => !schedule.paid)
              .reduce(
                (accumulator, current) =>
                  accumulator + Number(current.amountTime),
                0
              )}
          </Text>
        </div>
        <div className="flex justify-between">
          <Text>Débito total:</Text>
          <Text>
            {student.schedules
              ?.filter((schedule) => !schedule.paid)
              .reduce(
                (accumulator, current) =>
                  accumulator +
                  Number(current.pricePerTime) * Number(current.amountTime),
                0
              )}
          </Text>
        </div>
      </div>
      {student.schedules?.some((schedule) => !schedule.paid) && (
        <div className="flex flex-col gap-2 border-t-2 pt-2">
          <div className="flex justify-end">
            <Button
              text="Gerar Recibo"
              onClick={() => handleNavigate(String(student.id))}
              className="text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};
