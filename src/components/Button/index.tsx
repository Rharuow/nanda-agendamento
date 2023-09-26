import { Variant } from "@/index";
import classNames from "classnames";
import React from "react";

export const Button = ({
  text,
  ...rest
}: {
  text: string;
  className?: string;
  variant?: Variant;
}) => {
  return (
    <button
      className={classNames(`p-2 rounded  shadow ${rest.className || " "}`, {
        "bg-green-700 hover:bg-green-400": rest.variant === "success",
        "bg-slate-700 hover:bg-slate-400": !rest.variant,
      })}
    >
      {text}
    </button>
  );
};
