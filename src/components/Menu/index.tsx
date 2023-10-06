import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";

export const Menu = () => {
  return createPortal(
    <div
      className={classNames(
        "absolute top-0 bg-slate-400 z-50 h-screen w-screen"
      )}
    ></div>,
    document.body
  );
};
