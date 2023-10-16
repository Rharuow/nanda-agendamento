import { useThemeContext } from "@/src/context/theme";
import classNames from "classnames";

export const Text = (
  props: React.HTMLAttributes<HTMLParagraphElement> & { color?: string }
) => {
  const { className, color, children, ...rest } = props;
  const { theme } = useThemeContext();
  return (
    <span
      className={classNames(className || " ", {
        "text-red-500": !className?.includes("text-") && color === "red-500",
        "text-green-500":
          !className?.includes("text-") && color === "green-500",
        "text-neutral-300":
          !className?.includes("text-") &&
          !color &&
          (!theme || theme === "dark"),
        "text-neutral-800":
          !className?.includes("text-") && !color && theme === "light",
      })}
      {...rest}
    >
      {children}
    </span>
  );
};
