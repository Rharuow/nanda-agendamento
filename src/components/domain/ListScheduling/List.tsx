import { Schedule, Student } from "@/src/service";
import React from "react";
import Accordion from "../../Accordion";
import { Text } from "../../Text";
import { CaretDown } from "@phosphor-icons/react";
import dayjs from "dayjs";

export const List = ({
  schedules,
}: {
  schedules: Array<Schedule & { student: Student }>;
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      {schedules.map((schedule) => (
        <div className="bg-slate-400 px-3 rounded" key={schedule.id}>
          <Accordion
            id={schedule.id}
            iconClassName="text-white"
            headerChildren={
              <div className="flex justify-between w-full">
                <Text>{schedule.student.name}</Text>
                <Text>{dayjs(schedule.date).format("DD/MM/YYYY")}</Text>
              </div>
            }
            bodyChildren={
              <div className="flex flex-col bg-slate-500 rounded px-2">
                <Text>Pago? {schedule.paid}</Text>
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
};
