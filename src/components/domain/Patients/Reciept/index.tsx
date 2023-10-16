"use client";
import "./calendar.css";
import { Text } from "@/src/components/Text";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Empty } from "./Empty";
import { Error } from "./Error";
import { Loading } from "@/src/components/Loading";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import { Button } from "@/src/components/Button";
import { useGetPatient } from "@/src/service/hooks/patients/useGetPatient";
import classNames from "classnames";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { useGenerateQrCode } from "@/src/service/hooks/qrCode/useGenerateQrCode";
import { toast } from "react-toastify";
import { Toggle } from "@/src/components/form/Toggle";

export const Reciept = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetPatient({
    id,
  });
  const { back } = useRouter();
  const [withQrCode, setWithQrCode] = useState(true);

  const methods = useForm({
    defaultValues: {
      withQrCode,
    },
  });

  const { data: pix } = useGenerateQrCode({
    value: Number(
      data?.schedules
        .filter((schedule) => !schedule?.paid)
        .reduce(
          (accumulator, current) =>
            Number(current?.pricePerTime) * Number(current?.amountTime) +
            accumulator,
          0
        )
    ),
    message: "TESTE",
  });

  const handleCopyPixKey = () => {
    if (pix) {
      navigator.clipboard.writeText(pix?.key);
      toast.success("Chave copiada...");
    }
  };

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
          <div className="print:hidden">
            <div className="flex justify-end">
              <FormProvider {...methods}>
                <Toggle
                  name="withQrCode"
                  onClick={(value) => setWithQrCode(value)}
                  label="Com QrCode?"
                />
              </FormProvider>
            </div>
          </div>
          <div className="flex justify-center bg-slate-500 p-1 rounded">
            <Text className="text-center font-bold text-lg">{data.name}</Text>
          </div>
          <div className="grid grid-cols-6 gap-3 bg-slate-500 p-1 rounded">
            <Text className="text-center font-bold col-span-2">Data</Text>
            <Text className="text-center font-bold col-span-2">R$/Sessão</Text>
            <Text className="text-center font-bold col-span-2 truncate">
              Sessões
            </Text>
          </div>
          {data.schedules
            .filter((schedule) => !schedule?.paid)
            .sort((prev, next) =>
              dayjs(prev?.date).isAfter(dayjs(next?.date)) ? 1 : -1
            )
            .map((schedule, index) => (
              <div
                className="grid grid-cols-6 gap-3 bg-slate-500 p-2 rounded"
                key={index}
              >
                <Text className="col-span-2 text-center">
                  {dayjs(schedule?.date).toDate().toLocaleString("pt-BR", {
                    day: "numeric",
                    month: "numeric",
                    year: "2-digit",
                  })}
                </Text>
                <Text className="col-span-2 text-center">
                  R$ {schedule?.pricePerTime}
                </Text>
                <Text className=" col-span-2 text-center">
                  {schedule?.amountTime}
                </Text>
              </div>
            ))}
          <div className="flex justify-center items-center gap-3 bg-slate-500 p-2 rounded">
            <Text>Total:</Text>
            <Text className="text-center col-span-2">
              R${" "}
              {data.schedules
                .filter((schedule) => !schedule?.paid)
                .reduce(
                  (accumulator, current) =>
                    Number(current?.pricePerTime) *
                      Number(current?.amountTime) +
                    accumulator,
                  0
                )}
            </Text>
          </div>
          <div className="flex justify-center">
            <Calendar
              tileDisabled={({ date }) =>
                data.schedules
                  .filter((schedule) => !schedule?.paid)
                  .some((dt) => dayjs(dt?.date).isSame(dayjs(date)))
              }
            />
          </div>
          {pix && (
            <div
              className={classNames({
                "flex flex-col gap-2 items-center justify-center": withQrCode,
                hidden: !withQrCode,
              })}
            >
              <div className="flex flex-col gap-1 items-center">
                <Text className="font-bold print:text-black">Chave:</Text>
                <Text
                  className="break-all print:text-black"
                  onClick={handleCopyPixKey}
                >
                  {pix.key}
                </Text>
              </div>
              <Image
                alt="Qrcode Pix"
                src={pix.qrCode}
                width={280}
                height={280}
              />
            </div>
          )}
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
