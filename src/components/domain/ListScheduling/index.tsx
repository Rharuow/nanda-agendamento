import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useSchedules } from "@/src/service/hooks/useSchedules";
import { useStudents } from "@/src/service/hooks/useStudents";
import { useEffect, useState } from "react";
import { Loading } from "../../Loading";
import { Text } from "../../Text";
import Link from "next/link";
import { PlusCircle } from "@phosphor-icons/react";
import { InputSelectText } from "../../form/input/SelectText";
import { Toggle } from "../../form/Toggle";
import Accordion from "../../Accordion";
import dayjs from "dayjs";
import classNames from "classnames";
import { Empty } from "./Empty";
import { Schedule, Student } from "@/src/service";
import { FilterType } from "@/src/service/schedules/types";
import { filterSchedules } from "@/src/service/schedules/list";
import { InputDate } from "../../form/input/Date";

export const ListScheduling = () => {
  const methods = useForm<{
    name: string;
    date: string;
    startToNow: boolean;
    startAt: string;
  }>({
    defaultValues: {
      startToNow: true,
    },
  });

  const { control, setValue } = methods;

  const startToNowWatch = useWatch({ control, name: "startToNow" });
  const startAtWatch = useWatch({ control, name: "startAt" });

  console.log(!!startAtWatch);

  const [filter, setFilter] = useState<FilterType | undefined>({
    q: { startOfNow: startToNowWatch },
  });

  const { data: schedules, isLoading: schedulesIsLoading } = useSchedules();

  const { data: students, isLoading: studentsIsLoading } = useStudents();

  const [schedulesWithStudent, setSchedulesWithStudent] =
    useState<Array<Schedule & { student: Student }>>();

  const handleFilterName = (studentName: string) => {
    students?.some((student) => student.name === studentName)
      ? setFilter((prevState) => ({
          ...prevState,
          q: { ...prevState?.q, studentName },
        }))
      : setFilter((prevState) => {
          delete prevState?.q.studentName;
          if (prevState && Object.keys(prevState.q).length === 0)
            return undefined;
          if (prevState) return { ...prevState };
          return undefined;
        });
  };

  const handleStartOfNowFilter = (value: boolean) => {
    value
      ? setFilter((prevState) => {
          delete prevState?.q.startOfDate;
          setValue("startAt", "");
          return {
            q: { ...prevState?.q, startOfNow: value },
          };
        })
      : setFilter((prevState) => {
          delete prevState?.q.startOfNow;
          if (prevState && Object.keys(prevState.q).length === 0)
            return undefined;
          if (prevState) return { ...prevState };
          return undefined;
        });
  };

  const handleStartAtFilter = (value: string) => {
    value
      ? setFilter((prevState) => {
          setValue("startToNow", false);
          delete prevState?.q.startOfNow;
          return {
            q: { ...prevState?.q, startOfDate: value },
          };
        })
      : setFilter((prevState) => {
          delete prevState?.q.startOfDate;
          if (prevState && Object.keys(prevState.q).length === 0)
            return undefined;
          if (prevState) return { ...prevState };
          return undefined;
        });
  };

  useEffect(() => {
    schedules &&
      setSchedulesWithStudent(
        filter
          ? filterSchedules({
              filter,
              schedules: schedules,
              student: students?.find(
                (std) => std.name === filter.q.studentName
              ),
            })
          : schedules
      );
  }, [filter, schedules, students]);

  return (
    <div className="flex flex-col items-end gap-3">
      {schedulesIsLoading && studentsIsLoading ? (
        <Loading />
      ) : schedules && schedules.length > 0 ? (
        <>
          <Link href="/schedule">
            <div className="flex">
              <PlusCircle className="text-white self-end" size={24} />
            </div>
          </Link>
          <FormProvider {...methods}>
            <InputSelectText
              emptyLabel="Nenhum aluno encontrado"
              options={
                students
                  ? students?.map((student) => ({
                      label: student.name,
                      value: student.name,
                    }))
                  : []
              }
              onChange={(e) => {
                handleFilterName(e);
              }}
              name="name"
              label="Nome do Aluno"
            />
            <Toggle
              label="A partir de hoje"
              name="startToNow"
              onClick={(value) => handleStartOfNowFilter(value)}
            />
            <InputDate
              name="startAt"
              label="A partir de:"
              onChange={handleStartAtFilter}
            />
          </FormProvider>
          <div className="flex flex-col w-full gap-2">
            <h2>Agendamentos</h2>
            {schedulesWithStudent && schedulesWithStudent?.length > 0 ? (
              schedulesWithStudent?.map((schedule) => (
                <div className="bg-slate-400 px-3 rounded" key={schedule.id}>
                  <Accordion
                    id={schedule.id}
                    iconClassName="text-white"
                    headerChildren={
                      <div className="flex justify-between w-full">
                        <Text>{schedule?.student?.name}</Text>
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
                            className={classNames(
                              "font-bold px-2 rounded-full",
                              {
                                "text-red-700 bg-red-700/20": !schedule.paid,
                                "text-green-700 bg-green-700/20 ":
                                  schedule.paid,
                              }
                            )}
                          >
                            {schedule.paid ? "Sim" : "Não"}
                          </Text>
                        </div>
                      </div>
                    }
                  />
                </div>
              ))
            ) : (
              <Empty />
            )}
          </div>
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};
