import { Loading } from "@/src/components/Loading";
import { usePatients } from "@/src/service/hooks/patients/usePatients";
import React from "react";
import { Empty } from "./Empty";
import Accordion from "@/src/components/Accordion";
import classNames from "classnames";
import { Body } from "./Accordion/Body";

export const ListPatients = () => {
  const { data, isLoading, refetch } = usePatients();

  return (
    <div className="mt-4 flex grow flex-col items-center justify-center">
      {isLoading ? (
        <Loading />
      ) : data?.length === 0 ? (
        <Empty action={() => {}} />
      ) : (
        <>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
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
        </>
      )}
    </div>
  );
};
