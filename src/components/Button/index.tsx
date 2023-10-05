import { Variant } from "@/src/index";
import classNames from "classnames";
import React from "react";

export const Button = ({
  text,
  className,
  ...rest
}: {
  text: string;
  className?: string;
  variant?: Variant;
  onClick?: () => void;
}) => {
  return (
    <button
      className={classNames(`p-2 rounded  shadow ${className || " "}`, {
        "bg-green-700 text-white hover:bg-green-400":
          rest.variant === "success",
        "bg-red-700 text-white hover:bg-red-400": rest.variant === "danger",
        "text-green-700 bg-white  hover:text-green-400":
          rest.variant === "success-outline",
        "text-red-700 bg-white  hover:text-red-400":
          rest.variant === "danger-outline",
        "text-slate-500 bg-slate-100": rest.variant === "outline",
        "bg-slate-500 hover:bg-slate-500/50": !rest.variant,
      })}
      {...rest}
    >
      {text}
    </button>
  );
};
