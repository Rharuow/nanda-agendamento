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
  onChange?: (value: string) => void;
  labelClassName?: string;
  required?: boolean;
}) => {
  const [type, setType] = useState<"text" | "date">("text");
  const [isFocused, setIsFocused] = useState<boolean>(false);

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
        className={classNames(
          `w-full text-white bg-transparent border-b-[1px] animate-inputBlur focus:outline-none caret-white focus:animate-inputFocus ${
            rest.inputClassName || " "
          }`,
          {
            "animate-inputFocus": watchField,
            "animate-inputBlur": !watchField,
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
