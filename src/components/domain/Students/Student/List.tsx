"use client";
import React, { useEffect, useState } from "react";
import { Empty } from "./Empty";
import { FormCreateStudent } from "./Form/Create";
import { Error } from "./Error";
import { useRouter } from "next/navigation";
import { Schedule, Student } from "@/src/service";
import classNames from "classnames";
import { Body } from "./Accordion/Body";
import { useStudents } from "@/src/service/hooks/student/useStudents";
import { Modal } from "@/src/components/Modal";
import { Loading } from "@/src/components/Loading";
import Accordion from "@/src/components/Accordion";

export const List = () => {
  const { data, isLoading, isError, refetch } = useStudents();

  const [students, setStudents] =
    useState<Array<Student & { schedules: Array<Schedule> }>>();

  const { back } = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    data &&
      setStudents(data as Array<Student & { schedules?: Array<Schedule> }>);
  }, [data]);

  return (
    <>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          bodyChildren={
            <FormCreateStudent setShowModal={setShowModal} refetch={refetch} />
          }
        />
      )}
      <div
        className={classNames("grow flex flex-col mt-4", {
          "w-full justify-center items-center":
            isLoading || isError || students?.length === 0,
        })}
      >
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error action={() => back()} buttonText="Voltar" />
        ) : students?.length === 0 ? (
          <div className="flex flex-col grow h-full">
            <div className="flex items-center grow">
              <Empty action={() => setShowModal(true)} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              {students?.map((student) => (
                <Accordion
                  key={student.id}
                  id={String(student.id)}
                  className={classNames("px-4 rounded", {
                    "bg-green-700":
                      !student.schedules ||
                      student.schedules?.every((schedule) => schedule?.paid),
                    "bg-red-700":
                      student.schedules !== undefined &&
                      student.schedules?.some((schedule) => !schedule?.paid),
                  })}
                  textHeader={student.name}
                  bodyChildren={<Body student={student} refetch={refetch} />}
                  iconSize={18}
                  iconClassName="text-white"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
