import classNames from "classnames";
import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { OptionValue, Props } from "./types";
import { compare } from "@/utils/compareStrings";

export function InputSelectText<T extends OptionValue>({
  name,
  label,
  amount = 5,
  ...rest
}: Props<T>) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [options, setOption] = useState(rest.options);

  const { register, control, setValue } = useFormContext();

  const watchField = useWatch({ control, name });
  const watchFieldSelect = useWatch({ control, name: `${name}-select` });

  console.log("watchField = ", watchField);
  console.log("watchFieldSelect = ", watchFieldSelect);

  const handleFilterOptions = (text: string) => {
    setOption(rest.options.filter((opt) => compare(opt.label, text)));
  };

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
        <input type="hidden" {...register(name)} />
        <input
          id={`${name}-select`}
          type="text"
          className={classNames(
            `bg-transparent border-b-[1px] animate-inputBlur text-white focus:outline-none caret-white focus:animate-inputFocus ${
              rest.inputClassName || " "
            }`,
            {
              "animate-inputFocus": watchField,
              "animate-inputBlur": !watchField,
              "border-b-0": isFocused,
            }
          )}
          {...register(`${name}-select`, {
            onChange: (e) => {
              handleFilterOptions(e.target.value);
              rest.onChange && rest.onChange(e.target.value);
            },
            onBlur: () => {
              setIsFocused(false);
            },
          })}
          onFocus={() => setIsFocused(true)}
        />
        {isFocused && (
          <div className="flex-col transition-all bg-slate-500 p-2 rounded gap-1">
            {options
              .filter((_, index) => index < amount)
              .map((option, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setValue(name, option.value);
                    setValue(`${name}-select`, option.label);
                  }}
                  className="flex border-b-[1px] p-1"
                >
                  <span className="text-xs">{option.label}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
