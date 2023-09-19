import React, { useState } from "react";
import Calendar from "react-calendar";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { InputNumeric } from "../form/input/Numeric";
import { Button } from "../Button";
import { InputSelectText } from "../form/input/SelectText";
import { getSchedulesPerStudent, listStudents } from "@/service/api";
import classNames from "classnames";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export type FormCreateScheduling = {
  name: string;
  amount: number;
  price: number;
  date: string;
};

export const Scheduling = () => {
  const [date, setDate] = useState<string>();

  const students = listStudents();

  const methods = useForm<FormCreateScheduling>();

  const { watch, handleSubmit, setValue, register } = methods;

  const student = students.find((std) => std.id === watch("name"));
  const schedulingByStudents = student
    ? getSchedulesPerStudent(student.id)
    : [];

  const handleDate = (date: Date) => {
    setValue("date", date.toString());
  };

  const onSubmit = (data: FormCreateScheduling) => {
    console.log(!data.date);
    !data.date && toast.error("Data é obrigatória", { theme: "dark" });
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" hidden {...register("date")} />
        <InputSelectText<string>
          name="name"
          label="Nome do aluno"
          required
          options={students.map((Student) => ({
            label: Student.name,
            value: Student.id,
          }))}
        />
        <div className="flex gap-3">
          <InputNumeric
            required
            name="price"
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

        <div
          className={classNames("transition-all w-full overflow-hidden", {
            "animate-expanded": watch("name"),
            "max-h-0": !watch("name"),
          })}
        >
          <Calendar
            onChange={(dt) => handleDate(dt as Date)}
            {...(watch("date") && {
              value: watch("date") as Value,
              tileDisabled: ({ date }) =>
                schedulingByStudents &&
                schedulingByStudents.some((dt) =>
                  dayjs(dt.date).isSame(dayjs(date))
                ),
            })}
          />
        </div>
        <Button text="Salvar" variant="success" />
      </form>
    </FormProvider>
  );
};
