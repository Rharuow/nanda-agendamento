"use client";
import "./calendar.css";
import { Text } from "@/src/components/Text";
import { useGetStudent } from "@/src/service/hooks/useGetStudent";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Empty } from "./Empty";
import { Error } from "./Error";
import { Loading } from "@/src/components/Loading";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import { Button } from "@/src/components/Button";

export const Reciept = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetStudent({
    id,
    withSchedules: true,
  });
  const { back } = useRouter();

  const handleScreeShot = () => {
    window.print();
  };

  return (
    <div className="flex flex-col grow">
      <div className="absolute print:hidden">
        <Text onClick={() => back()}>
          <ArrowCircleLeft size={28} />
        </Text>
      </div>
      {!id && (
        <div className="flex grow justify-center items-center">
          <Empty action={() => back()} textButton="Voltar" />
        </div>
      )}
      {isError ? (
        <div className="flex grow justify-center items-center">
          <Error buttonText="Voltar" action={() => back()} />
        </div>
      ) : isLoading ? (
        <div className="flex grow justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Text className="text-center font-bold text-lg">Extrato</Text>
          <div className="flex justify-center bg-slate-700 p-1 rounded">
            <Text className="text-center font-bold text-lg">{data.name}</Text>
          </div>
          <div className="grid grid-cols-6 gap-3 bg-slate-700 p-1 rounded">
            <Text className="text-center col-span-3">Data</Text>
            <Text className="text-center col-span-2">Valor/aula</Text>
            <Text className="text-center truncate">Aulas</Text>
          </div>
          {data.schedules
            .filter((schedule) => !schedule.paid)
            .sort((prev, next) =>
              dayjs(prev.date).isAfter(dayjs(next.date)) ? 1 : -1
            )
            .map((schedule) => (
              <div
                className="grid grid-cols-6 gap-3 bg-slate-700 p-2 rounded"
                key={schedule.id}
              >
                <Text className="col-span-3">
                  {dayjs(schedule.date).toDate().toLocaleString("pt-BR", {
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                  })}
                </Text>
                <Text className="col-span-2 text-center">
                  R$ {schedule.pricePerTime}
                </Text>
                <Text className="text-center">{schedule.amountTime}</Text>
              </div>
            ))}
          <div className="flex justify-center items-center gap-3 bg-slate-700 p-2 rounded">
            <Text>Total:</Text>
            <Text className="text-center">
              R${" "}
              {data.schedules
                .filter((schedule) => !schedule.paid)
                .reduce(
                  (accumulator, current) =>
                    Number(current.pricePerTime) * current.amountTime +
                    accumulator,
                  0
                )}
            </Text>
          </div>
          <div className="flex justify-center">
            <Calendar
              tileDisabled={({ date }) =>
                data.schedules
                  .filter((schedule) => !schedule.paid)
                  .some((dt) => dayjs(dt.date).isSame(dayjs(date)))
              }
            />
          </div>
          <Button
            className="print:hidden"
            text="Imprimir"
            onClick={() => handleScreeShot()}
          />
        </div>
      )}
    </div>
  );
};
