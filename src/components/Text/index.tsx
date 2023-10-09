import classNames from "classnames";

export const Text = (
  props: React.HTMLAttributes<HTMLParagraphElement> & { color?: string }
) => {
  const { className, children, ...rest } = props;
  return (
    <span
      className={classNames(className ?? " ", {
        "text-red-500": rest.color === "red-500",
        "text-green-500": rest.color === "green-500",
        "text-white": !rest.color,
      })}
      {...rest}
    >
      {children}
    </span>
  );
};
