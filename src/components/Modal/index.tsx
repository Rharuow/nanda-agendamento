import dynamic from "next/dynamic";
import React, { Dispatch, SetStateAction } from "react";

const TEModal = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEModal)
);

const TEModalDialog = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEModalDialog)
);

export const Modal = ({
  setShowModal,
  showModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <TEModal show={showModal} setShow={setShowModal}>
      <TEModalDialog></TEModalDialog>
    </TEModal>
  );
};
