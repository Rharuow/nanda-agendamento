import { Schedule, Student } from "@/src/service";
import React from "react";
import Accordion from "../../Accordion";
import { Text } from "../../Text";

export const List = ({
  schedules,
}: {
  schedules: Array<Schedule & { student: Student }>;
}) => {
  return schedules.map((schedule) => (
    <div key={schedule.id}>
      <Accordion
        id={schedule.id}
        headerChildren={
          <div className="flex w-full">
            <Text>{schedule.student.name}</Text>
          </div>
        }
        textBody={`Pago: ${schedule.paid}`}
      />
    </div>
  ));
};
