import React from "react";
import { Text } from "@/src/components/Text";
import { Patient, Schedule } from "@/src/service";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { Trash } from "@phosphor-icons/react";

const TERipple = dynamic(() =>
  import("tw-elements-react").then((res) => res.TERipple)
);
export const Header = ({
  schedule,
  deleteOnClick,
}: {
  schedule: Schedule & { patient: Patient };
  deleteOnClick: () => void;
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <Text>{schedule?.patient?.name}</Text>
      <Text>
        {schedule.amountTime > 1
          ? `${schedule.amountTime} sessões`
          : `${schedule.amountTime} sessão`}
      </Text>
      <Text>{dayjs(schedule.date).format("DD/MM/YYYY")}</Text>
      <Text>
        {dayjs(schedule.date)
          .toDate()
          .toLocaleString("pt-BR", { weekday: "short" })}
      </Text>
      <TERipple rippleColor="white">
        <div
          className="flex bg-red-500/30 p-1 rounded"
          onClick={() => {
            deleteOnClick && deleteOnClick();
          }}
        >
          <Trash className="text-red-500" />
        </div>
      </TERipple>
    </div>
  );
};
