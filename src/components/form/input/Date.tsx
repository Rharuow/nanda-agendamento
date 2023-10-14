import { useThemeContext } from "@/src/context/theme";
import classNames from "classnames";
import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const InputDate = ({
  name,
  label,
  ...rest
}: {
  name: string;
  label?: string;
  className?: string;
  inputClassName?: string;
  autoComplete?: string;
  onChange?: (value: string) => void;
  labelClassName?: string;
  required?: boolean;
}) => {
  const [type, setType] = useState<"text" | "date">("text");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { theme } = useThemeContext();

  const { register, control } = useFormContext();

  const watchField = useWatch({ control, name });

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
      <input
        id={name}
        type={type}
        autoComplete={rest.autoComplete ?? "date-value"}
        className={classNames(
          `w-full bg-transparent border-b-[1px] animate-inputBlur focus:outline-none focus:animate-inputFocus ${
            rest.inputClassName || " "
          }`,
          {
            "animate-inputFocus": watchField,
            "animate-inputBlur": !watchField,
            "text-white caret-white": !theme || theme === "dark",
          }
        )}
        {...register(name, {
          ...(rest.required && { required: true }),
          ...(rest.onChange && {
            onChange: (e) => {
              rest.onChange && rest.onChange(e.target.value);
            },
          }),
        })}
        onFocus={() => {
          setType("date");
          setIsFocused(true);
        }}
        onBlur={() => {
          setType("text");
          setIsFocused(false);
        }}
      />
    </div>
  );
};
