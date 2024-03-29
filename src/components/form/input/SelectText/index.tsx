import classNames from "classnames";
import React, { useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { OptionValue, Props } from "./types";
import { compare } from "@/src/utils/compareStrings";
import { useThemeContext } from "@/src/context/theme";

export function InputSelectText<T extends OptionValue>({
  name,
  label,
  amount = 5,
  ...rest
}: Props<T>) {
  const { theme } = useThemeContext();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [options, setOption] = useState(
    rest.options.length > 0
      ? rest.options.filter((_, index) => index < amount)
      : [
          {
            label: rest.emptyLabel ? rest.emptyLabel : "Nenhuma opção",
            value: undefined,
          },
        ]
  );

  const { register, control, setValue } = useFormContext();

  const watchField = useWatch({ control, name });

  const handleFilterOptions = (text: string) => {
    const filteredOptions = rest.options.filter((opt) =>
      compare(opt.label, text)
    );
    text && text.length > 0
      ? setOption(
          filteredOptions.length > 0
            ? filteredOptions
            : [
                {
                  label: rest.emptyLabel || `Adicionar ${text}`,
                  value: "Nenhum registro" as T,
                },
              ]
        )
      : setOption(
          rest.options.length > 0
            ? rest.options.filter((_, index) => index < amount)
            : [
                {
                  label: rest.emptyLabel ? rest.emptyLabel : "Nenhuma opção",
                  value: undefined,
                },
              ]
        );
    setValue(name, text);
  };

  const selectField = useRef<HTMLInputElement>(null);

  return (
    <div className={`relative w-full ${rest.className || " "}`}>
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
          type="hidden"
          {...register(name, { ...(rest.required && { required: true }) })}
        />
        <input
          id={name}
          autoComplete={rest.autoComplete ?? "choose-option"}
          ref={selectField}
          type="text"
          className={classNames(
            `bg-transparent border-b-[1px] animate-inputBlur focus:outline-none focus:animate-inputFocus ${
              rest.inputClassName || " "
            }`,
            {
              "animate-inputFocus": watchField,
              "animate-inputBlur": !watchField,
              "border-b-0": isFocused,
              "text-white caret-white": !theme || theme === "dark",
            }
          )}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur && rest.onBlur(e.target.value as T);
          }}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus && rest.onFocus(e.target.value as T);
          }}
          onChange={(e) => {
            handleFilterOptions(e.target.value);
            rest.onChange && rest.onChange(e.target.value as T);
          }}
          {...(rest.required && { required: true })}
        />
        <div
          className={classNames(
            "flex-col transition-all bg-slate-700 text-white rounded gap-1",
            { "p-2 animate-expanded": isFocused, "max-h-0": !isFocused }
          )}
        >
          {options
            .filter((_, index) => index < amount)
            .map((option, index) => (
              <div
                key={index}
                onMouseDown={() => {
                  const hasOption = rest.options.some((opt) =>
                    compare(opt.label, String(selectField?.current?.value))
                  );
                  setValue(name, option.value);
                  if (selectField && selectField.current && hasOption)
                    selectField.current.value = option.label;
                }}
                className={classNames("p-1", {
                  hidden: !isFocused,
                  flex: isFocused,
                })}
              >
                <span className="text-xs font-bold">{option.label}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
