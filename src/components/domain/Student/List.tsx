"use client";
import { useStudents } from "@/src/service/hooks/useStudents";
import React, { useEffect, useState } from "react";
import { Empty } from "./Empty";
import { Modal } from "../../Modal";
import { FormCreateStudent } from "./Form/Create";
import { Error } from "./Error";
import { useRouter } from "next/navigation";
import { Loading } from "../../Loading";
import { Student } from "@/src/service";
import { Text } from "../../Text";

export const List = () => {
  const { data, isLoading, isError } = useStudents({ q: { schedules: true } });

  const [students, setStudents] = useState<Array<Student>>();

  const { back } = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    console.log("data = ", data);
    data && setStudents(data);
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
      <div className="h-screen w-full justify-center flex items-center">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error action={() => back()} buttonText="Voltar" />
        ) : students?.length === 0 ? (
          <Empty action={() => setShowModal(true)} />
        ) : (
          students?.map((student) => (
            <Text key={student.id}>{student.name}</Text>
          ))
        )}
      </div>
    </>
  );
};
