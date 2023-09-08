import React, { useState } from "react";
import Calendar from "react-calendar";
import { InputText } from "../form/input/Text";
import { FormProvider, useForm } from "react-hook-form";
import { InputNumeric } from "../form/input/Numeric";

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export type FormCreateScheduling = {
  name: string;
  pricePerHour: number;
  dates: Array<string>;
};

export const Scheduling = () => {
  const [dates, setDates] = useState<Value>();

  const methods = useForm();

  const handleDate = (date: ValuePiece) => {
    console.log(date);
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <FormProvider {...methods}>
        <form className="flex flex-col gap-3 w-full">
          <div className="flex justify-center gap-2">
            <InputText name="name" label="Nome do aluno" />
          </div>
          <div className="flex justify-around gap-2">
            <InputNumeric
              name="price"
              className="w-50"
              label="Valor por aula"
            />
            <InputNumeric
              name="price"
              className="w-50"
              label="Quantidade aulas"
            />
          </div>
        </form>
      </FormProvider>
      <Calendar
        onChange={(date) => handleDate(date as Date | null)}
        {...(dates && { value: dates })}
      />
    </div>
  );
};
