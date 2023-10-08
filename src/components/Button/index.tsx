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
        "bg-blue-700 text-white hover:bg-blue-400": rest.variant === "info",
        "bg-red-700 text-white hover:bg-red-400": rest.variant === "danger",
        "text-green-700 bg-transparent border-[1px] border-green-700 hover:text-green-400":
          rest.variant === "success-outline",
        "text-red-700 bg-transparent border-[1px] border-red-700 hover:text-red-400":
          rest.variant === "danger-outline",
        "text-blue-700 bg-transparent border-[1px] border-blue-700 hover:text-blue-400":
          rest.variant === "info-outline",
        "text-slate-500 bg-transparent": rest.variant === "outline",
        "bg-slate-500 hover:bg-slate-500/50": !rest.variant,
      })}
      {...rest}
    >
      {text}
    </button>
  );
};
