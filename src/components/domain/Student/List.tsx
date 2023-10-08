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
        className={classNames("", {
          "h-screen w-full justify-center flex items-center":
            isLoading || isError || students?.length === 0,
        })}
      >
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error action={() => back()} buttonText="Voltar" />
        ) : students?.length === 0 ? (
          <Empty action={() => setShowModal(true)} />
        ) : (
          students?.map((student) => (
            <div
              key={student.id}
              className={classNames("flex", {
                "bg-green-500": student.schedules?.every(
                  (schedule) => schedule.paid
                ),
                "bg-red-500": student.schedules?.some(
                  (schedule) => !schedule.paid
                ),
              })}
            >
              {student.name}
            </div>
          ))
        )}
      </div>
    </>
  );
};
