import classNames from "classnames";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const Toggle = ({
  className,
  name,
  onClick,
  ...rest
}: {
  className?: string;
  onClick?: (value: boolean) => void;
  name: string;
}) => {
  const { register, control, setValue } = useFormContext();

  const fieldWatch = useWatch({ control, name });

  return (
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
  );
};
