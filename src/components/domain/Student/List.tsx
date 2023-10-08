"use client";
import { useStudents } from "@/src/service/hooks/useStudents";
import React, { useEffect, useState } from "react";
import { Empty } from "./Empty";
import { Modal } from "../../Modal";
import { FormCreateStudent } from "./Form/Create";
import { Error } from "./Error";
import { useRouter } from "next/navigation";
import { Loading } from "../../Loading";
import { Schedule, Student } from "@/src/service";
import { Text } from "../../Text";
import classNames from "classnames";
import Accordion from "../../Accordion";
import { Body } from "./Accordion/Body";
import { ArrowCircleLeft } from "@phosphor-icons/react";

export const List = () => {
  const { data, isLoading, isError } = useStudents({ q: { schedules: true } });

  const [students, setStudents] =
    useState<Array<Student & { schedules: Array<Schedule> }>>();

  const { back } = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    data &&
      setStudents(data as Array<Student & { schedules: Array<Schedule> }>);
  }, [data]);

  return (
    <>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          bodyChildren={<FormCreateStudent />}
        />
      )}
      <div
        className={classNames("grow flex flex-col", {
          "h-screen w-full justify-center items-center":
            isLoading || isError || students?.length === 0,
        })}
      >
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error action={() => back()} buttonText="Voltar" />
        ) : students?.length === 0 ? (
          <div className="flex flex-col grow h-full">
            <div className="self-start">
              <Text onClick={() => back()}>
                <ArrowCircleLeft size={28} />
              </Text>
            </div>
            <div className="flex items-center grow">
              <Empty action={() => setShowModal(true)} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="self-start flex w-full">
              <Text onClick={() => back()} className="absolute">
                <ArrowCircleLeft size={28} />
              </Text>
              <Text className="grow text-center font-bold text-lg">Alunos</Text>
            </div>
            <div className="flex flex-col gap-2">
              {students?.map((student) => (
                <Accordion
                  key={student.id}
                  id={String(student.id)}
                  className={classNames("px-4 rounded", {
                    "bg-green-700": student.schedules?.every(
                      (schedule) => schedule.paid
                    ),
                    "bg-red-700": student.schedules?.some(
                      (schedule) => !schedule.paid
                    ),
                  })}
                  textHeader={student.name}
                  bodyChildren={<Body student={student} />}
                  iconSize={18}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
