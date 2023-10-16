"use client";
import React, { useCallback, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
import { Patient } from "@/src/service";
import { Loading } from "@/src/components/Loading";
import { InputSelectText } from "@/src/components/form/input/SelectText";
import { InputCurrency } from "@/src/components/form/input/Currency";
import { InputNumeric } from "@/src/components/form/input/Numeric";
import { Button } from "@/src/components/Button";
import { usePatients } from "@/src/service/hooks/patients/usePatients";

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export type FormCreateScheduling = {
  name: string;
  amount: number;
  price: string;
  date: string;
};

export const Scheduling = () => {
  const methods = useForm<FormCreateScheduling>();

  const router = useRouter();

  const { watch, handleSubmit, setValue, register } = methods;

  const {
    data: patients,
    isLoading: patientsIsLoading,
    refetch: patientsRefetch,
  } = usePatients();

  const [patient, setPatient] = useState<Patient>();

  const handleDate = (date: Date) => {
    setValue("date", date.toString());
  };

  const handleChangeNameInput = useCallback(
    (name: string) => {
      if (!name || !patients || !patients.some((stu) => stu.name === name))
        return setPatient(undefined);
      setPatient(patients.find((stu) => stu.name === name));
    },
    [patients]
  );

  const onSubmit = (data: FormCreateScheduling) => {
    if (!data.date) return toast.error("Data é obrigatória");
    // createSchedule(data, {
    //   onSuccess: (res) => {
    //     toast.success("Agendamento feito com sucesso...");
    //     patientsRefetch();
    //   },
    //   onError: (error) => {
    //     console.log("Create schedule error = ", error);
    //     toast.error("Erro ao agendar...");
    //   },
    // });
  };

  useEffect(() => {
    handleChangeNameInput(watch("name"));
  }, [handleChangeNameInput, watch]);

  return (
    <div className="flex flex-col grow items-stretch relative w-full gap-2">
      {patientsIsLoading ? (
        <div className="flex flex-col w-screen items-center gap-2">
          <Loading />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            className="flex w-full grow justify-center self-stretch flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input type="text" hidden {...register("date")} />
            <InputSelectText<string>
              name="name"
              label="Nome do aluno"
              required
              emptyLabel="Paciente não cadastrado"
              onChange={(name) => handleChangeNameInput(name)}
              options={
                patients && patients.length > 0
                  ? patients.map((patient) => ({
                      label: patient.name,
                      value: patient.name,
                    }))
                  : []
              }
            />
            <div className="flex w-full gap-3">
              <InputCurrency
                name="price"
                className="w-1/2"
                required
                label="Valor por aula"
              />
              <InputNumeric
                className="w-1/2"
                name="amount"
                required
                label="Quantidade aulas"
              />
            </div>

            {watch("name") && (
              <div className="w-full flex justify-center overflow-hidden">
                <Calendar
                  key={watch("name")}
                  onChange={(dt) => handleDate(dt as Date)}
                  {...(patient &&
                    patient.schedules.length > 0 && {
                      value: watch("date") as Value,
                      tileDisabled: ({ date }) =>
                        patient.schedules.some((schedule) =>
                          dayjs(schedule?.date).isSame(dayjs(date))
                        ),
                    })}
                />
              </div>
            )}
            <Button text="Agendar" variant="success" />
          </form>
        </FormProvider>
      )}
    </div>
  );
};
