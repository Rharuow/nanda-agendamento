import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useSchedules } from "@/src/service/hooks/useSchedules";
import { useStudents } from "@/src/service/hooks/useStudents";
import { useEffect, useState } from "react";
import { Loading } from "../../Loading";
import Link from "next/link";
import { PlusCircle, Trash } from "@phosphor-icons/react";
import { InputSelectText } from "../../form/input/SelectText";
import { Toggle } from "../../form/Toggle";
import Accordion from "../../Accordion";
import dayjs from "dayjs";
import { Empty } from "./Empty";
import { Schedule, Student } from "@/src/service";
import { FilterType } from "@/src/service/schedules/types";
import { filterSchedules } from "@/src/service/schedules/list";
import { InputDate } from "../../form/input/Date";

import { Modal } from "../../Modal";
import { Button } from "../../Button";
import { useDeleteSchedule } from "@/src/service/hooks/useDeleteSchedule";
import { toast } from "react-toastify";
import { Header } from "./Accordion/Header";
import { Body } from "./Accordion/Body";
import { useUpdatePaidSchedule } from "@/src/service/hooks/useUpdatePaidSchedule";

export const ListScheduling = () => {
  const methods = useForm<{
    name: string;
    date: string;
    paid: boolean;
    startToNow: boolean;
    startAt: string;
    endedAt: string;
  }>({
    defaultValues: {
      startToNow: true,
    },
  });

  const { control, setValue } = methods;

  const startToNowWatch = useWatch({ control, name: "startToNow" });

  const [filter, setFilter] = useState<FilterType | undefined>({
    q: { startOfNow: startToNowWatch },
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    data: schedules,
    isLoading: schedulesIsLoading,
    refetch: refetchSchedule,
  } = useSchedules();

  const [schedule, setSchedule] = useState<Schedule & { student: Student }>();

  const { mutateAsync: deleteSchedule } = useDeleteSchedule();
  const { mutateAsync: updateSchedule } = useUpdatePaidSchedule();

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

  const handleUpdatePaidSchedule = (id: string) => {
    updateSchedule(id, {
      onSuccess: () => {
        toast.success("Agendamento atualizado com sucesso");
        refetchSchedule();
      },
      onError: () => {
        toast.error("Problemas ao atualizar o agendamento");
        refetchSchedule();
      },
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

  const handlePaidFilter = (value: boolean) => {
    value
      ? setFilter((prevState) => {
          setValue("paid", value);
          return {
            q: { ...prevState?.q, paid: value },
          };
        })
      : setFilter((prevState) => {
          delete prevState?.q.paid;
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

  const handleEndedAtFilter = (value: string) => {
    value
      ? setFilter((prevState) => {
          return {
            q: { ...prevState?.q, endOfDate: value },
          };
        })
      : setFilter((prevState) => {
          delete prevState?.q.endOfDate;
          if (prevState && Object.keys(prevState.q).length === 0)
            return undefined;
          if (prevState) return { ...prevState };
          return undefined;
        });
  };

  const handleDeleteSchedule = () => {
    deleteSchedule(String(schedule?.id), {
      onSuccess: () => {
        toast.success("Agendamento apagado com sucesso...");
        setShowModal(false);
        refetchSchedule();
      },
      onError: () => {
        toast.error("Não foi possível apagar esse agendamento");
      },
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

  useEffect(() => {
    !showModal && setSchedule(undefined);
  }, [showModal]);

  return (
    <div className="flex flex-col items-end gap-3">
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        key={schedule?.id}
        size="sm"
        body={`Apagar o agendamento de ${dayjs(schedule?.date)
          .toDate()
          .toLocaleString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })} (${dayjs(schedule?.date).toDate().toLocaleString("pt-BR", {
          weekday: "long",
        })}) do aluno(a) ${schedule?.student.name}?`}
        footerChildren={
          <div className="flex w-full justify-between gap-2">
            <Button
              text="Cancelar"
              variant="outline"
              className="grow"
              onClick={() => setShowModal(false)}
            />
            <Button
              text="Apagar"
              variant="danger"
              className="grow"
              onClick={() => handleDeleteSchedule()}
            />
          </div>
        }
      />
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
              onChange={handleFilterName}
              name="name"
              label="Nome do Aluno"
            />
            <div className="flex w-full justify-between gap-2">
              <Toggle
                labelPosition="end"
                label="A partir de hoje"
                name="startToNow"
                onClick={handleStartOfNowFilter}
              />
              <Toggle label="Pagos" name="paid" onClick={handlePaidFilter} />
            </div>
            <div className="flex gap-2">
              <InputDate
                name="startAt"
                className="w-1/2"
                label="A partir de:"
                onChange={handleStartAtFilter}
              />
              <InputDate
                className="w-1/2"
                name="endedAt"
                label="Até:"
                onChange={handleEndedAtFilter}
              />
            </div>
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
                      <Header
                        deleteOnClick={() => {
                          setSchedule(schedule);
                          setShowModal(true);
                        }}
                        schedule={schedule}
                      />
                    }
                    bodyChildren={
                      <Body
                        onClickToogle={() =>
                          handleUpdatePaidSchedule(schedule.id)
                        }
                        schedule={schedule}
                      />
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
