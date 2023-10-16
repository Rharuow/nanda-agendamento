import { useThemeContext } from "@/src/context/theme";
import dynamic from "next/dynamic";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Text } from "../Text";

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
  const { theme } = useThemeContext();
  return (
    <TEModal show={showModal} setShow={setShowModal}>
      <style jsx global>
        {`
          .modal-body {
            background: ${theme === "dark"
              ? "rgb(30, 30, 30)"
              : "rgb(200, 200, 200)"};
          }
        `}
      </style>
      <TEModalDialog centered size={size}>
        <TEModalContent className="modal-body">
          {(headerChildren || header) && (
            <TEModalHeader>
              {headerChildren || <Text>{header}</Text>}
            </TEModalHeader>
          )}
          {(bodyChildren || body) && (
            <TEModalBody>{bodyChildren || <Text>{body}</Text>}</TEModalBody>
          )}
          {(footerChildren || footer) && (
            <TEModalFooter>{footer || footerChildren}</TEModalFooter>
          )}
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};
