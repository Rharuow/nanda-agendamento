import classNames from "classnames";
import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const InputText = ({
  name,
  label,
  ...rest
}: {
  name: string;
  label?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { register, control } = useFormContext();

  const watchField = useWatch({ control, name });

  return (
    <div className={`relative ${rest.className || " "}`}>
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            `text-gray-500 absolute align-top ${rest.labelClassName || " "}`,
            {
              "animate-labelFocus": isFocused || watchField,
              "animate-labelBlur": !watchField && !isFocused,
            }
          )}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type="text"
        className={classNames(
          `bg-transparent border-b-[1px] animate-inputBlur text-white focus:outline-none caret-white focus:animate-inputFocus ${
            rest.inputClassName || " "
          }`,
          {
            "animate-inputFocus": watchField,
            "animate-inputBlur": !watchField,
          }
        )}
        {...register(name)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
