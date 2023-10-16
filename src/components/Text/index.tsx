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
        "text-red-500": color === "red-500",
        "text-green-500": color === "green-500",
        "text-neutral-300": !color && (!theme || theme === "dark"),
        "text-neutral-800": !color && theme === "light",
      })}
      {...rest}
    >
      {children}
    </span>
  );
};
