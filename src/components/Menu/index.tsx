import { X, XCircle } from "@phosphor-icons/react";
import classNames from "classnames";
import React, { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";

export const Menu = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  return createPortal(
    <div className="flex flex-row-reverse">
      <div
        className={classNames(
          "absolute flex flex-col overflow-hidden top-0 bg-slate-400 z-50 h-screen w-screen",
          {
            "animate-menuOpen": show,
            "animate-menuClose": !show,
          }
        )}
      >
        <div
          className={classNames("flex self-end", {
            "animate-easeOut": !show,
            "animate-easeIn": show,
          })}
          onClick={() => setShow(false)}
        >
          <XCircle size={38} className="text-white" />
        </div>
      </div>
    </div>,
    document.body
  );
};
