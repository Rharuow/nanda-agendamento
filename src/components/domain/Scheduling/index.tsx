"use client";
import React from "react";
import Calendar from "react-calendar";
import { FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { ArrowCircleLeft } from "@phosphor-icons/react";

import { InputNumeric } from "../../form/input/Numeric";
import { Button } from "../../Button";
import { InputSelectText } from "../../form/input/SelectText";
import { Text } from "../../Text";
import { InputCurrency } from "../../form/input/Currency";
import { useStudents } from "../../../service/hooks/useStudents";
import { Loading } from "../../Loading";
import { useCreateSchedule } from "@/src/service/hooks/useCreateSchedule";
import { useRouter } from "next/navigation";
import { useGetStudentByName } from "@/src/service/hooks/useGetStudentByName";
import { QueryClient } from "@tanstack/react-query";

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
    data: students,
    isLoading: studentsIsLoading,
    refetch: studentsRefetch,
  } = useStudents({ staleTime: 0 });

  const {
    data: student,
    refetch: studentRefetech,
    isLoading: studentIsLoading,
    isFetching: studentIsFetching,
  } = useGetStudentByName(
    students?.find((std) => std.name === watch("name"))?.name
  );

  const { mutateAsync: createSchedule } = useCreateSchedule();

  const handleDate = (date: Date) => {
    setValue("date", date.toString());
  };

  const onSubmit = async (data: FormCreateScheduling) => {
    if (!data.date) return toast.error("Data é obrigatória");
    await createSchedule(data, {
      onSuccess: (res) => {
        toast.success("Agendamento feito com sucesso...");
        studentsRefetch();
        studentRefetech();
      },
      onError: (error) => {
        console.log("Create schedule error = ", error);
        toast.error("Erro ao agendar...");
      },
    });
  };

  return (
    <div className="flex flex-wrap items-stretch w-full gap-2">
      <div className="self-start">
        <Text onClick={() => router.back()}>
          <ArrowCircleLeft size={28} />
        </Text>
      </div>
      {studentsIsLoading && studentIsLoading && studentIsFetching ? (
        <div className="flex flex-col w-screen items-center gap-2">
          <Loading />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            className="flex w-full self-stretch flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input type="text" hidden {...register("date")} />
            <InputSelectText<string>
              name="name"
              key={`${studentsIsLoading}`}
              label="Nome do aluno"
              required
              emptyLabel="Aluno não cadastrado"
              options={
                students && students.length > 0
                  ? students.map((student) => ({
                      label: student.name,
                      value: student.name,
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
                  key={student?.id}
                  onChange={(dt) => handleDate(dt as Date)}
                  {...(student &&
                    student.schedules.length > 0 && {
                      value: watch("date") as Value,
                      tileDisabled: ({ date }) =>
                        student.schedules.some((schedule) =>
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
