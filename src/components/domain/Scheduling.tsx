import dayjs from "dayjs";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import { InputText } from "../form/input/Text";

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export type FormCreateScheduling = {
  name: string;
  pricePerHour: number;
  dates: Array<string>;
};

export const Scheduling = () => {
  const [dates, setDates] = useState<Value>();

  const {} = useForm<FormCreateScheduling>();

  const handleDate = (date: ValuePiece) => {
    console.log(date);
  };

  return (
    <div className="flex flex-col items-center justify-around py-3 gap-3">
      <div className="flex">
        <form>
          <InputText name="name" label="Nome do aluno" />
        </form>
      </div>
      <Calendar
        onChange={(date) => handleDate(date as Date | null)}
        {...(dates && { value: dates })}
      />
    </div>
  );
};
