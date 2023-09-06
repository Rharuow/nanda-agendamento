import classNames from "classnames";
import React, { useState } from "react";

export const InputText = ({
  name,
  label,
  ...rest
}: {
  name: string;
  label?: string;
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className={classNames("text-gray-500 absolute align-top", {
            "text-[11px]": isFocused,
          })}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type="text"
        className="bg-transparent border-b-[1px] text-white focus:outline-none caret-white focus:border-b-2 focus:pt-3 "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
