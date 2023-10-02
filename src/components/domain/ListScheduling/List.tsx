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

export const List = ({
  schedules,
  students,
}: {
  schedules: Array<Schedule & { student?: Student }>;
  students: Array<Student>;
}) => {
  const methods = useForm<{ name: string; date: string }>();

  const { control } = methods;

  const studantNameRef = useWatch({ control, name: "name" });

  const [studentId, setStudentId] = useState<string>();

  const { data: schedulesPerStudent } = useGetSchedulesPerStudent(studentId);

  useEffect(() => {
    setStudentId(
      students.find((student) => student.name === studantNameRef)?.id
    );
  }, [studantNameRef, students]);

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
      </FormProvider>
      <div className="flex flex-col w-full gap-2">
        <h2>Agendamentos</h2>
        {(studentId
          ? (schedulesPerStudent as Array<Schedule & { student?: Student }>)
          : schedules
        ).map((schedule) => (
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
