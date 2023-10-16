import { useThemeContext } from "@/src/context/theme";
import classNames from "classnames";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useFormContext, useWatch } from "react-hook-form";

export const InputCurrency = ({
  name,
  label,
  defaultValue,
  ...rest
}: {
  name: string;
  label?: string;
  defaultValue?: number;
  className?: string;
  autoComplete?: string;
  inputClassName?: string;
  labelClassName?: string;
  required?: boolean;
}) => {
  const { register, control, setValue } = useFormContext();
  const watchField = useWatch({ control, name });
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { theme } = useThemeContext();

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
      <CurrencyInput
        id={name}
        autoComplete={rest.autoComplete ?? "currency-value"}
        {...(defaultValue && { defaultValue })}
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
        decimalsLimit={2}
        prefix="R$"
        decimalSeparator=","
        groupSeparator="."
        inputMode="numeric"
        {...register(name, {
          ...(rest.required && {
            required: { value: true, message: "Esse campo é obrigatório" },
          }),
        })}
        onValueChange={(value, name) => setValue(String(name), value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
