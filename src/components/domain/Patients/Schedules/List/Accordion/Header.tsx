import React from "react";
import { Text } from "@/src/components/Text";
import { Patient, Schedule } from "@/src/service";
import dayjs from "dayjs";
import { Trash } from "@phosphor-icons/react";

export const Header = ({
  schedule,
  deleteOnClick,
}: {
  schedule: Schedule & { patient: Patient };
  deleteOnClick: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <Text>{schedule?.patient?.name}</Text>
      <Text>{dayjs(schedule.date).format("DD/MM/YYYY")}</Text>
      <div
        className="flex bg-red-500/30 p-1 rounded"
        onClick={(e) => {
          e.preventDefault();
          deleteOnClick && deleteOnClick(e);
        }}
      >
        <Trash className="text-red-500" />
      </div>
    </div>
  );
};
