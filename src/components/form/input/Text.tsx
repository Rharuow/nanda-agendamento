import classNames from "classnames";
import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Text } from "../../Text";
import { useThemeContext } from "@/src/context/theme";

export const InputText = ({
  name,
  label,
  ...rest
}: {
  name: string;
  autoComplete?: string;
  label?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  required?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { theme } = useThemeContext();

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

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
        autoComplete={rest.autoComplete ?? "text-value"}
        type="text"
        className={classNames(
          `w-full  bg-transparent border-b-[1px] animate-inputBlur focus:outline-none focus:animate-inputFocus ${
            rest.inputClassName || " "
          }`,
          {
            "animate-inputFocus": watchField,
            "animate-inputBlur": !watchField,
            "text-dark": theme === "light",
            "text-white caret-white": !theme || theme === "dark",
          }
        )}
        {...register(name, {
          ...(rest.required && {
            required: { value: true, message: "Esse campo é obrigatório" },
          }),
        })}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <Text color="red-500" className="text-[12px] font-bold">
            {message}
          </Text>
        )}
      />
    </div>
  );
};
