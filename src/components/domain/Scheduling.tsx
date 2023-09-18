import React, { useState } from "react";
import Calendar from "react-calendar";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { InputNumeric } from "../form/input/Numeric";
import { Button } from "../Button";
import { InputSelectText } from "../form/input/SelectText";
import { listStudents } from "@/service/api";
import classNames from "classnames";

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export type FormCreateScheduling = {
  name: string;
  pricePerHour: number;
  dates: Array<string>;
};

export const Scheduling = () => {
  const [date, setDate] = useState<string>();

  const methods = useForm<{ name: string; amount: number; price: number }>();

  console.log(methods.watch("name"));

  const handleDate = (date: Date) => {
    setDate(date.toLocaleString());
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
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

        <div
          className={classNames("w-full overflow-hidden", {
            "animate-expanded": methods.watch("name"),
          })}
        >
          <Calendar
            onChange={(dt) => handleDate(dt as Date)}
            {...(date && {
              value: date as Value,
              // tileDisabled: ({ date }) =>
              //   dates.some((dt) => dt.getDate() === date.getDate()),
            })}
          />
        </div>
        <Button text="Salvar" variant="success" />
      </form>
    </FormProvider>
  );
};
