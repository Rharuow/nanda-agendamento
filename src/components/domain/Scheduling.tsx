import React, { useState } from "react";
import Calendar from "react-calendar";
import { FormProvider, useForm } from "react-hook-form";
import classNames from "classnames";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import Link from "next/link";

import { InputNumeric } from "../form/input/Numeric";
import { Button } from "../Button";
import { InputSelectText } from "../form/input/SelectText";
import {
  createScheduling,
  getSchedulesPerStudent,
  getStudentByName,
  listStudents,
} from "@/src/service/api";

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export type FormCreateScheduling = {
  name: string;
  amount: number;
  price: number;
  date: string;
};

export const Scheduling = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const students = listStudents();

  const methods = useForm<FormCreateScheduling>();

  const { watch, handleSubmit, setValue, register } = methods;

  const student = getStudentByName(watch("name"));

  const schedulingByStudents = student
    ? getSchedulesPerStudent(student.id)
    : [];

  const handleDate = (date: Date) => {
    setValue("date", date.toString());
  };

  const onSubmit = (data: FormCreateScheduling) => {
    if (!data.date) return toast.error("Data é obrigatória");
    setLoading(true);
    createScheduling(data);
    toast.success("Agendamento feito com sucesso...");
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full self-start">
        <Link href="/">
          <ArrowCircleLeft size={28} />
        </Link>
      </div>
      <FormProvider {...methods}>
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin h-5 w-5 rounded-full border-white border-l-[3px]"></div>
            <p>Carregando...</p>
          </div>
        ) : (
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input type="text" hidden {...register("date")} />
            <InputSelectText<string>
              name="name"
              label="Nome do aluno"
              required
              options={students.map((student) => ({
                label: student.name,
                value: student.name,
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

            {watch("name") && (
              <div className="transition-all w-full overflow-hidden">
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
            )}
            <Button text="Salvar" variant="success" />
          </form>
        )}
      </FormProvider>
    </div>
  );
};
