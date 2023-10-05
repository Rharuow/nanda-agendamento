import dynamic from "next/dynamic";
import { Trash } from "@phosphor-icons/react";
import React, { Dispatch, SetStateAction } from "react";

const TERipple = dynamic(() =>
  import("tw-elements-react").then((res) => res.TERipple)
);

export const DeleteButton = ({
  setShowModal,
  onClick,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onClick?: () => void;
}) => {
  return (
    <TERipple rippleColor="white">
      <div
        className="flex bg-red-500/30 p-1 rounded"
        onClick={() => {
          onClick && onClick();
          setShowModal(true);
        }}
      >
        <Trash className="text-red-500" />
      </div>
    </TERipple>
  );
};
