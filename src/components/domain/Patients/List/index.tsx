"use client";
import { Loading } from "@/src/components/Loading";
import { usePatients } from "@/src/service/hooks/patients/usePatients";
import React, { useState } from "react";
import { Empty } from "./Empty";
import Accordion from "@/src/components/Accordion";
import classNames from "classnames";
import { Body } from "./Accordion/Body";
import { Modal } from "@/src/components/Modal";
import { FormCreatePatient } from "./Form/Create";
import { Text } from "@/src/components/Text";
import { UserCirclePlus, UserPlus } from "@phosphor-icons/react";

export const ListPatients = () => {
  const { data, isLoading, refetch, isError } = usePatients();

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div
      className={classNames("grow flex flex-col mt-4", {
        "w-full justify-center items-center":
          isLoading || isError || data?.length === 0,
      })}
    >
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          bodyChildren={
            <FormCreatePatient setShowModal={setShowModal} refetch={refetch} />
          }
        />
      )}
      {isLoading ? (
        <Loading />
      ) : data?.length === 0 ? (
        <Empty action={() => setShowModal(true)} />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 relative">
            <div className="flex justify-end">
              <div
                className="border border-dashed border-neutral-700 rounded-full p-1"
                onClick={() => setShowModal(true)}
              >
                <Text className="text-neutral-700">
                  <UserPlus size={24} />
                </Text>
              </div>
            </div>
            {data?.map((patient) => (
              <Accordion
                key={patient.id}
                id={String(patient.id)}
                className={classNames("px-4 rounded", {
                  "bg-green-700":
                    !patient.schedules ||
                    patient.schedules?.every((schedule) => schedule?.paid),
                  "bg-red-700":
                    patient.schedules !== undefined &&
                    patient.schedules?.some((schedule) => !schedule?.paid),
                })}
                textHeader={patient.name}
                bodyChildren={<Body patient={patient} refetch={refetch} />}
                iconSize={18}
                iconClassName="text-white"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
