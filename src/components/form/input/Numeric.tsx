import classNames from "classnames";
import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const InputNumeric = ({
  name,
  label,
  ...rest
}: {
  name: string;
  label?: string;
  className?: string;
  inputClassName?: string;
  required?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { register, control } = useFormContext();

  const watchField = useWatch({ control, name });

  return (
    <div className={`relative w-full ${rest.className || ""}`}>
      {label && (
        <label
          htmlFor={name}
          className={classNames("text-gray-500 absolute align-top", {
            "animate-labelFocus": isFocused || watchField,
            "animate-labelBlur": !watchField && !isFocused,
          })}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        pattern="[0-9]*"
        inputMode="numeric"
        type="number"
        className={classNames(
          `bg-transparent w-full border-b-[1px] animate-inputBlur focus:outline-none caret-white focus:animate-inputFocus ${
            rest.inputClassName || " "
          }`,
          {
            "animate-inputFocus": watchField,
            "animate-inputBlur": !watchField,
          }
        )}
        {...register(name, {
          ...(rest.required && { required: true }),
        })}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
