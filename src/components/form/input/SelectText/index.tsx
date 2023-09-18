import classNames from "classnames";
import React, { useRef, useState } from "react";
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

  const handleFilterOptions = (text: string) => {
    const filteredOptions = rest.options.filter((opt) =>
      compare(opt.label, text)
    );
    text.length > 0
      ? setOption(
          filteredOptions.length > 0
            ? filteredOptions
            : [{ label: "Novo registro", value: "Novo registro" as T }]
        )
      : setOption(rest.options);
    setValue(name, text);
  };

  const selectField = document.getElementById(
    `${name}-select`
  ) as HTMLInputElement;

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
          onBlur={(e) => {
            setIsFocused(false);
            selectField.autofocus = true;
          }}
          onFocus={(e) => {
            setIsFocused(true);
          }}
          onChange={(e) => {
            e.target.value.length > 0
              ? handleFilterOptions(e.target.value)
              : setValue(name, undefined);
            rest.onChange && rest.onChange(e.target.value as T);
          }}
        />
        <div
          className={classNames(
            "flex-col transition-all bg-slate-700  rounded gap-1",
            { "p-2 expanded": isFocused, "max-h-0": !isFocused }
          )}
        >
          {options
            .filter((_, index) => index < amount)
            .map((option, index) => (
              <div
                key={index}
                onMouseDown={() => {
                  setValue(name, option.value);
                  selectField.value = option.label;
                }}
                className={classNames("p-1", {
                  hidden: !isFocused,
                  flex: isFocused,
                })}
              >
                <span className="text-xs text-white font-bold">
                  {option.label}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
