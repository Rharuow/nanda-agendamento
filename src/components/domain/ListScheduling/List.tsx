import { Schedule, Student } from "@/src/service";
import React, { useEffect, useState } from "react";
import Accordion from "../../Accordion";
import { Text } from "../../Text";
import dayjs from "dayjs";
import classNames from "classnames";
import { PlusCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { InputSelectText } from "../../form/input/SelectText";
import { useGetSchedulesPerStudent } from "@/src/service/hooks/useGetSchedulesPerStudent";
import { Toggle } from "../../form/Toggle";
import { filters } from "./util/filter";

export const List = ({
  schedules: schedulesProp,
  students,
}: {
  schedules: Array<Schedule & { student?: Student }>;
  students: Array<Student>;
}) => {
  const methods = useForm<{
    name: string;
    date: string;
    startToNow: boolean;
  }>();

  const [schedules, setSchedules] =
    useState<Array<Schedule & { student?: Student }>>(schedulesProp);

  const { control } = methods;

  const studantNameWatch = useWatch({ control, name: "name" });
  const startToNowWatch = useWatch({ control, name: "startToNow" });

  const [studentId, setStudentId] = useState<string>();

  const { data: schedulesPerStudent } = useGetSchedulesPerStudent(studentId);

  return (
    <div className="flex flex-col items-end gap-3">
      <Link href="/schedule">
        <div className="flex">
          <PlusCircle className="text-white self-end" size={24} />
        </div>
      </Link>
      <FormProvider {...methods}>
        <InputSelectText
          options={students.map((student) => ({
            label: student.name,
            value: student.name,
          }))}
          name="name"
          label="Nome do Aluno"
        />
        <Toggle name="startToNow" />
      </FormProvider>
      <div className="flex flex-col w-full gap-2">
        <h2>Agendamentos</h2>
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
    </div>
  );
};
