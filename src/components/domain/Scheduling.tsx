import React, { useState } from "react";
import Calendar from "react-calendar";
import { InputText } from "../form/input/Text";
import { FormProvider, useForm } from "react-hook-form";
import { InputNumeric } from "../form/input/Numeric";
import { Button } from "../Button";
import { InputSelectText } from "../form/input/SelectText";
import { listStudents } from "@/service/api";
import { Student } from "@/service";

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export type FormCreateScheduling = {
  name: string;
  pricePerHour: number;
  dates: Array<string>;
};

export const Scheduling = () => {
  const [dates, setDates] = useState<Array<Date>>();

  const methods = useForm();

  const handleDate = (date: Date) => {
    setDates((prevState) => [...(prevState || []), date]);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Calendar
        onChange={(date) => handleDate(date as Date)}
        {...(dates && {
          value: dates as Value,
          tileDisabled: ({ date }) =>
            dates.some((dt) => dt.getDate() === date.getDate()),
        })}
      />
      <form
        className="flex flex-col gap-3"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <InputSelectText<string>
          name="name"
          label="Nome do aluno"
          options={listStudents().map((Student) => ({
            label: Student.name,
            value: Student.id,
          }))}
        />
        <div className="flex gap-3">
          <InputNumeric name="price" label="Valor por aula" className="w-1/2" />
          <InputNumeric
            name="amount"
            label="Quantidade aulas"
            className="w-1/2"
          />
        </div>
        <Button text="Salvar" variant="success" />
      </form>
    </FormProvider>
  );
};
