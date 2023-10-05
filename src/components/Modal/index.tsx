import dynamic from "next/dynamic";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

const TEModal = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEModal)
);

const TEModalDialog = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEModalDialog)
);

const TEModalContent = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEModalContent)
);

const TEModalHeader = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEModalHeader)
);

const TEModalBody = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEModalBody)
);

const TEModalFooter = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEModalFooter)
);

const TERipple = dynamic(() =>
  import("tw-elements-react").then((res) => res.TERipple)
);

export const Modal = ({
  setShowModal,
  showModal,
  header,
  headerChildren,
  body,
  bodyChildren,
  footer,
  footerChildren,
  size,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  header?: string;
  headerChildren?: ReactNode;
  body?: string;
  bodyChildren?: ReactNode;
  footer?: string;
  footerChildren?: ReactNode;
  size?: "xl" | "lg" | "sm";
}) => {
  return (
    <TEModal show={showModal} setShow={setShowModal}>
      <TEModalDialog centered size={size}>
        <TEModalContent>
          {(headerChildren || header) && (
            <TEModalHeader>{headerChildren || header}</TEModalHeader>
          )}
          {(bodyChildren || body) && (
            <TEModalBody>{bodyChildren || body}</TEModalBody>
          )}
          {(footerChildren || footer) && (
            <TEModalFooter>{footer || footerChildren}</TEModalFooter>
          )}
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};
