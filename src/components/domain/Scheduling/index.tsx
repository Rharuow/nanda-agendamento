import React, { useState } from "react";
import Calendar from "react-calendar";
import { FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import Link from "next/link";

import { InputNumeric } from "../../form/input/Numeric";
import { Button } from "../../Button";
import { InputSelectText } from "../../form/input/SelectText";
import { Text } from "../../Text";
import { createScheduling } from "@/src/service/api";
import { InputCurrency } from "../../form/input/Currency";
import { useStudents } from "../../../service/hooks/useStudents";
import { useGetStudentByName } from "../../../service/hooks/useGetStudentByName";
import { useGetSchedulesPerStudent } from "../../../service/hooks/useGetSchedulesPerStudent";
import { Loading } from "../../Loading";

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export type FormCreateScheduling = {
  name: string;
  amount: number;
  price: number;
  date: string;
};

export const Scheduling = () => {
  const methods = useForm<FormCreateScheduling>();

  const { watch, handleSubmit, setValue, register } = methods;

  const { data: students, isLoading: studentsIsLoading } = useStudents();

  const {
    data: student,
    isLoading: studentIsLoading,
    isFetching: studentIsFetching,
  } = useGetStudentByName(watch("name"));

  const {
    data: schedulingByStudents,
    isLoading: schedulingByStudentsIsLoading,
    isFetching: schedulingByStudentsIsFetching,
  } = useGetSchedulesPerStudent(student?.id);

  const handleDate = (date: Date) => {
    setValue("date", date.toString());
  };

  const onSubmit = (data: FormCreateScheduling) => {
    console.log("data = ", data);
    if (!data.date) return toast.error("Data é obrigatória");
    createScheduling(data);
    toast.success("Agendamento feito com sucesso...");
  };

  return (
    <div className="flex w-full flex-wrap p-3">
      <div className="self-start">
        <Text>
          <Link href="/">
            <ArrowCircleLeft size={28} />
          </Link>
        </Text>
      </div>
      <FormProvider {...methods}>
        {studentIsLoading &&
        studentsIsLoading &&
        schedulingByStudentsIsLoading ? (
          <div className="flex flex-col w-full items-center gap-2">
            <Loading />
          </div>
        ) : (
          <form
            className="flex flex-col gap-3 pe-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input type="text" hidden {...register("date")} />
            <InputSelectText<string>
              name="name"
              label="Nome do aluno"
              required
              options={
                students
                  ? students.map((student) => ({
                      label: student.name,
                      value: student.name,
                    }))
                  : []
              }
            />
            <div className="flex gap-3">
              <InputCurrency
                name="price"
                required
                label="Valor por aula"
                className="w-1/2"
              />
              <InputNumeric
                name="amount"
                required
                label="Quantidade aulas"
                className="w-1/2"
              />
            </div>

            {watch("name") && (
              <div className="w-full flex justify-center overflow-hidden">
                <Calendar
                  onChange={(dt) => handleDate(dt as Date)}
                  {...(watch("date") &&
                    schedulingByStudents && {
                      value: watch("date") as Value,
                      tileDisabled: ({ date }) =>
                        schedulingByStudents.some((dt) =>
                          dayjs(dt.date).isSame(dayjs(date))
                        ),
                    })}
                />
              </div>
            )}
            <Button text="Agendar" variant="success" />
          </form>
        )}
      </FormProvider>
    </div>
  );
};
