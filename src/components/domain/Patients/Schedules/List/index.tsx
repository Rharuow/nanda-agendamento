import { Button } from "@/src/components/Button";
import { Loading } from "@/src/components/Loading";
import { Modal } from "@/src/components/Modal";
import { Toggle } from "@/src/components/form/Toggle";
import { InputDate } from "@/src/components/form/input/Date";
import { InputSelectText } from "@/src/components/form/input/SelectText";
import { Patient, Schedule } from "@/src/service";
import { useDeleteSchedule } from "@/src/service/hooks/patients/useDeleteSchedule";
import { useSchedules } from "@/src/service/hooks/patients/useSchedules";
import { useUpdatePaidSchedule } from "@/src/service/hooks/patients/useUpdatePaidSchedule";
import { filterSchedules } from "@/src/service/patients/schedules/list";
import { FilterType } from "@/src/service/patients/schedules/types";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { Empty } from "./Empty";
import Accordion from "@/src/components/Accordion";
import { Header } from "./Accordion/Header";
import { Body } from "./Accordion/Body";

export const ListSchedules = () => {
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

  const [patients, setPatients] = useState<Array<Patient>>();

  const {
    data: schedulesData,
    isLoading: schedulesDataIsLoading,
    refetch: refetchSchedule,
  } = useSchedules();

  const [schedules, setSchedules] = useState(schedulesData);

  const [schedule, setSchedule] = useState<
    Schedule & { index: number } & { patient: Patient }
  >();

  const { mutateAsync: deleteSchedule } = useDeleteSchedule();
  const { mutateAsync: updateSchedule } = useUpdatePaidSchedule();

  const handleFilterName = (patientName: string) => {
    patients?.some((patient) => patient.name === patientName)
      ? setFilter((prevState) => ({
          ...prevState,
          q: { ...prevState?.q, patientName },
        }))
      : setFilter((prevState) => {
          delete prevState?.q.patientName;
          if (prevState && Object.keys(prevState.q).length === 0)
            return undefined;
          if (prevState) return { ...prevState };
          return undefined;
        });
  };

  const handleUpdatePaidSchedule = (id: number, patient: Patient) => {
    updateSchedule(
      { id, patient },
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
    patient,
  }: {
    id: number;
    patient: Patient;
  }) => {
    deleteSchedule(
      { id, patient },
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
    if (schedulesData) {
      setSchedules(
        filter
          ? filterSchedules({
              filter,
              schedules: schedulesData as Array<
                Schedule & { patient: Patient; position: number }
              >,
            })
          : schedulesData
      );
    }
  }, [filter, schedulesData]);

  useEffect(() => {
    setPatients(
      schedules
        ?.map((schedule) => schedule.patient)
        .filter(
          (patient, index, self) =>
            index === 0 || self[index - 1].name !== patient.name
        )
    );
  }, [schedules]);

  return (
    <div className="flex flex-col grow items-stretch relative w-full gap-2 mt-4">
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
        })}) do paciente ${schedule?.patient.name}?`}
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
                  patient: schedule.patient,
                })
              }
            />
          </div>
        }
      />
      <FormProvider {...methods}>
        <InputSelectText
          emptyLabel="Nenhum paciente encontrado"
          options={
            patients
              ? patients?.map((student) => ({
                  label: student.name,
                  value: student.name,
                }))
              : []
          }
          onChange={handleFilterName}
          name="name"
          label="Nome do Paciente"
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
      {schedulesDataIsLoading ? (
        <div className="h-screen flex self-center justify-center items-center">
          <Loading />
        </div>
      ) : schedules && schedules.length === 0 ? (
        <Empty />
      ) : (
        schedules &&
        schedules.length > 0 && (
          <div className="flex flex-col w-full gap-2">
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
                            patient: sche.patient,
                          });
                          setShowModal(true);
                        }}
                        schedule={sche as Schedule & { patient: Patient }}
                      />
                    }
                    bodyChildren={
                      <Body
                        onClickToogle={() =>
                          handleUpdatePaidSchedule(sche.position, sche.patient)
                        }
                        schedule={
                          sche as Schedule & {
                            patient: Patient;
                            position: number;
                          }
                        }
                      />
                    }
                  />
                </div>
              ))
            ) : (
              <Empty />
            )}
          </div>
        )
      )}
    </div>
  );
};
