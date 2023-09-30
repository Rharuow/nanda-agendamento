import { Schedule, Student } from "@/src/service";
import React from "react";
import Accordion from "../../Accordion";
import { Text } from "../../Text";
import dayjs from "dayjs";
import classNames from "classnames";

import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);

export const List = ({
  schedules,
}: {
  schedules: Array<Schedule & { student?: Student }>;
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
                <Text>{schedule.student?.name}</Text>
                <Text>
                  {schedule.amountTime > 1
                    ? `${schedule.amountTime} horários`
                    : `${schedule.amountTime} horário`}
                </Text>
                <Text>{dayjs(schedule.date).format("DD/MM/YYYY")}</Text>
                <Text>
                  {dayjs(schedule.date)
                    .toDate()
                    .toLocaleString("pt-BR", { weekday: "short" })}
                </Text>
              </div>
            }
            bodyChildren={
              <div className="flex flex-col bg-slate-500/30 rounded px-2 py-1">
                <div className="flex justify-around">
                  <Text className="font-bold">Pago?</Text>
                  <Text
                    className={classNames("font-bold px-2 rounded-full", {
                      "text-red-700 bg-red-700/20": !schedule.paid,
                      "text-green-700 bg-green-700/20 ": schedule.paid,
                    })}
                  >
                    {schedule.paid ? "Sim" : "Não"}
                  </Text>
                </div>
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
};
