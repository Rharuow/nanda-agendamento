import dynamic from "next/dynamic";
import { Trash } from "@phosphor-icons/react";
import React, { Dispatch, SetStateAction } from "react";

const TERipple = dynamic(() =>
  import("tw-elements-react").then((res) => res.TERipple)
);

export const DeleteButton = ({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <TERipple rippleColor="white">
      <div
        className="flex bg-red-500/30 p-1 rounded"
        onClick={() => setShowModal(true)}
      >
        <Trash className="text-red-500" />
      </div>
    </TERipple>
  );
};
