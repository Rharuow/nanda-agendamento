import classNames from "classnames";
import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { OptionValue, Props } from "./types";

export function InputSelectText<T extends OptionValue>({
  name,
  label,
  ...rest
}: Props<T>) {
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
      <div className="flex flex-col gap-[1px]">
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
        {isFocused && (
          <div className="flex flex-col bg-white p-2 rounded gap-1">
            {rest.options.map((option, index) => (
              <div key={index} className="flex border-b-[1px] p-1">
                <span className="text-xs">{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
