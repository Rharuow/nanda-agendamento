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

export const Reciept = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetStudent({
    id,
    withSchedules: true,
  });
  const { back } = useRouter();

  return (
    <div className="flex flex-col grow">
      <div className="absolute">
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
          {data.schedules
            .filter((schedule) => !schedule.paid)
            .map((schedule) => (
              <div
                className="flex gap-3 justify-between bg-slate-700 p-2 rounded"
                key={schedule.id}
              >
                <Text className="grow">
                  {dayjs(schedule.date).toDate().toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "2-digit",
                  })}
                </Text>
                <Text>
                  (
                  {dayjs(schedule.date).toDate().toLocaleString("pt-BR", {
                    weekday: "short",
                  })}
                  )
                </Text>
                <Text>
                  {schedule.amountTime}{" "}
                  {schedule.amountTime > 1 ? "aulas" : "aula"}
                </Text>
              </div>
            ))}
          <Calendar
            tileDisabled={({ date }) =>
              data.schedules.some((dt) => dayjs(dt.date).isSame(dayjs(date)))
            }
          />
        </div>
      )}
    </div>
  );
};
