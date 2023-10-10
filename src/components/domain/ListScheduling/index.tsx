import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useSchedules } from "@/src/service/hooks/useSchedules";
import { useEffect, useState } from "react";
import { Loading } from "../../Loading";
import {
  BookBookmark,
  List,
  Student as StudentIcon,
} from "@phosphor-icons/react";
import { InputSelectText } from "../../form/input/SelectText";
import { Toggle } from "../../form/Toggle";
import Accordion from "../../Accordion";
import dayjs from "dayjs";
import { Empty } from "./Empty";
import { Schedule, Student } from "@/src/service";
import { FilterType } from "@/src/service/schedules/types";
import { InputDate } from "../../form/input/Date";

import { Modal } from "../../Modal";
import { Button } from "../../Button";
import { useDeleteSchedule } from "@/src/service/hooks/useDeleteSchedule";
import { toast } from "react-toastify";
import { Header } from "./Accordion/Header";
import { Body } from "./Accordion/Body";
import { useUpdatePaidSchedule } from "@/src/service/hooks/useUpdatePaidSchedule";
import { Menu } from "../../Menu";
import { filterSchedules } from "@/src/service/schedules/list";

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
  const [showMenu, setShowMenu] = useState<boolean>();

  const [students, setStudents] = useState<Array<Student>>();

  const {
    data: schedulesData,
    isLoading: schedulesDataIsLoading,
    refetch: refetchSchedule,
  } = useSchedules();

  const [schedules, setSchedules] = useState(schedulesData);

  const [schedule, setSchedule] = useState<
    Schedule & { index: number } & { student: Student }
  >();

  const { mutateAsync: deleteSchedule } = useDeleteSchedule();
  const { mutateAsync: updateSchedule } = useUpdatePaidSchedule();

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

  const handleUpdatePaidSchedule = (id: number, student: Student) => {
    updateSchedule(
      { id, student },
      {
        onSuccess: () => {
          toast.success("Agendamento atualizado com sucesso");
          refetchSchedule();
        },
        onError: () => {
          toast.error("Problemas ao atualizar o agendamento");
          refetchSchedule();
        },
      }
    );
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

  const handleDeleteSchedule = ({
    id,
    student,
  }: {
    id: number;
    student: Student;
  }) => {
    deleteSchedule(
      { id, student },
      {
        onSuccess: () => {
          toast.success("Agendamento apagado com sucesso...");
          setShowModal(false);
          refetchSchedule();
        },
        onError: () => {
          toast.error("Não foi possível apagar esse agendamento");
        },
      }
    );
  };

  useEffect(() => {
    !showModal && setSchedule(undefined);
  }, [showModal]);

  useEffect(() => {
    console.log(schedulesData);
    setSchedules(
      filter && schedulesData
        ? filterSchedules({
            filter,
            schedules: schedulesData as Array<
              Schedule & { student: Student; position: number }
            >,
          })
        : schedulesData
    );
  }, [filter, schedulesData]);

  return (
    <div className="flex flex-col items-end gap-3">
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        key={schedule?.index}
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
              onClick={() =>
                schedule &&
                handleDeleteSchedule({
                  id: schedule.index,
                  student: schedule.student,
                })
              }
            />
          </div>
        }
      />
      {schedulesDataIsLoading ? (
        <div className="h-screen flex self-center justify-center items-center">
          <Loading />
        </div>
      ) : schedules && schedules.length === 0 ? (
        <Empty />
      ) : (
        schedules &&
        schedules.length > 0 && (
          <>
            <div
              className="flex"
              onClick={() => {
                setShowMenu(true);
              }}
            >
              <List className="text-white self-end" size={24} />
            </div>
            {showMenu !== undefined && (
              <Menu
                show={showMenu}
                setShow={setShowMenu}
                items={[
                  {
                    icon: BookBookmark,
                    label: "Criar reservas",
                    route: "/schedule",
                  },
                  {
                    icon: StudentIcon,
                    label: "Alunos",
                    route: "/students",
                  },
                ]}
              />
            )}
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
              {schedules && schedules?.length > 0 ? (
                schedules?.map((sche, index) => (
                  <div className="bg-slate-400 px-3 rounded" key={index}>
                    <Accordion
                      id={index}
                      iconClassName="text-white"
                      headerChildren={
                        <Header
                          deleteOnClick={() => {
                            setSchedule({
                              amountTime: Number(sche.amountTime),
                              date: String(sche.date),
                              paid: Boolean(sche.paid),
                              index,
                              pricePerTime: Number(sche.pricePerTime),
                              student: sche.student,
                            });
                            setShowModal(true);
                          }}
                          schedule={sche as Schedule & { student: Student }}
                        />
                      }
                      bodyChildren={
                        <Body
                          onClickToogle={() =>
                            handleUpdatePaidSchedule(index, sche.student)
                          }
                          schedule={sche as Schedule & { student: Student }}
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
        )
      )}
    </div>
  );
};
