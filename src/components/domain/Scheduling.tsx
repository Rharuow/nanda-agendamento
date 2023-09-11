import React, { useState } from "react";
import Calendar from "react-calendar";
import { InputText } from "../form/input/Text";
import { FormProvider, useForm } from "react-hook-form";
import { InputNumeric } from "../form/input/Numeric";
import { Button } from "../Button";

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
    console.log(date);
    setDates((prevState) => [...(prevState || []), date]);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-3">
        <InputText name="name" label="Nome do aluno" inputClassName="w-full" />
        <div className="flex gap-3">
          <InputNumeric
            name="price"
            label="Valor por aula"
            className="w-1/2"
            inputClassName="w-full"
          />
          <InputNumeric
            name="amount"
            label="Quantidade aulas"
            className="w-1/2"
            inputClassName="w-full"
          />
        </div>
      </form>
      <Calendar
        onChange={(date) => handleDate(date as Date)}
        {...(dates && {
          value: dates as Value,
          tileDisabled: ({ date }) =>
            dates.some((dt) => dt.getDate() === date.getDate()),
        })}
      />

      <Button text="Salvar" variant="success" />
    </FormProvider>
  );
};
