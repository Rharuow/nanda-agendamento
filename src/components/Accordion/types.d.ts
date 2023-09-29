import { ReactNode } from "react";

export type AccordionProps = {
  textHeader?: string;
  textBody?: string;
  headerChildren?: ReactNode;
  bodyChildren?: ReactNode;
  id: number | string;
};
