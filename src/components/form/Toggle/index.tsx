import classNames from "classnames";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Text } from "@/src/components/Text";

export const Toggle = ({
  className,
  name,
  onClick,
  label,
  labelPosition,
  ...rest
}: {
  className?: string;
  onClick?: (value: boolean) => void;
  name: string;
  label?: string;
  labelPosition?: "top" | "end" | "bottom" | "start";
}) => {
  const { register, control, setValue } = useFormContext();

  const fieldWatch = useWatch({ control, name });

  return (
    <div
      className={classNames(`flex gap-3 items-center ${className ?? " "}`, {
        "flex-col": labelPosition === "top",
        "flex-col-reverse": labelPosition === "bottom",
        "flex-row-reverse": labelPosition === "end",
        "flex-row": labelPosition === "start",
      })}
    >
      <Text>{label}</Text>
      <div
        className={`flex w-[30px] relative ${className ?? " "}`}
        onClick={() => {
          setValue(name, !fieldWatch);
          onClick && onClick(!fieldWatch);
        }}
        {...rest}
      >
        <input type="checkbox" {...register(name)} id="" className="hidden" />
        <div
          className={classNames("border-8 rounded-full z-10", {
            "border-red-500 animate-translateToLeft": !fieldWatch,
            "border-green-500 animate-translateToRight": fieldWatch,
          })}
        ></div>
        <div
          className={classNames("w-[30px] h-[16px] z-0 rounded-xl absolute", {
            "bg-red-500/50": !fieldWatch,
            "bg-green-500/50": fieldWatch,
          })}
        ></div>
      </div>
    </div>
  );
};
