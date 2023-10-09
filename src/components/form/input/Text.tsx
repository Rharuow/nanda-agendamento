import classNames from "classnames";
import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Text } from "../../Text";

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
  required?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

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
        type="text"
        className={classNames(
          `w-full bg-transparent border-b-[1px] animate-inputBlur focus:outline-none caret-white focus:animate-inputFocus ${
            rest.inputClassName || " "
          }`,
          {
            "animate-inputFocus": watchField,
            "animate-inputBlur": !watchField,
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
