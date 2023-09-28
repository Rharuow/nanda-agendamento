import classNames from "classnames";

export const Text = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { className, children, ...rest } = props;
  return (
    <span className={`text-white ${className ?? " "}`} {...rest}>
      {children}
    </span>
  );
};
