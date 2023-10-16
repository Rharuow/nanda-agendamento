import { ReactNode } from "react";

export type AccordionProps = {
  textHeader?: string;
  onClick?: () => void;
  iconSize?: number;
  className?: string;
  textBody?: string;
  headerChildren?: ReactNode;
  bodyChildren?: ReactNode;
  withArrow?: boolean;
  iconClassName?: string;
  buttonClassName?: string;
  bodyClassName?: string;
  id: number | string;
};
