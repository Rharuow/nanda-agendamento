"use client";

import { useState, useEffect } from "react";
import { Text } from "../Text";
import { CaretDown } from "@phosphor-icons/react";
import classNames from "classnames";

import { AccordionProps } from "./types";

export default function Accordion({
  id,
  textHeader,
  textBody,
  iconSize,
  buttonClassName,
  bodyClassName,
  bodyChildren,
  headerChildren,
  withArrow,
  iconClassName,
  className,
}: AccordionProps) {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  useEffect(() => {
    setAccordionOpen(false);
  }, []);

  return (
    <div className={`py-2 ${className ?? " "}`}>
      <button
        className={`flex items-center justify-between w-full text-left font-semibold py-2 ${buttonClassName}`}
        onClick={(e) => {
          e.preventDefault();
          setAccordionOpen(!accordionOpen);
        }}
        aria-expanded={accordionOpen}
        aria-controls={`accordion-${id}`}
      >
        {textHeader ? (
          <>
            <Text>{textHeader}</Text>
            <CaretDown
              className={classNames(`duration-500 ${iconClassName ?? " "}`, {
                "rotate-180": accordionOpen,
              })}
              size={iconSize ?? 32}
            />
          </>
        ) : (
          <>
            {headerChildren}
            {withArrow && (
              <CaretDown
                className={classNames(`duration-500 ${iconClassName ?? " "}`, {
                  "rotate-180": accordionOpen,
                })}
                size={iconSize ?? 32}
              />
            )}
          </>
        )}
      </button>
      <div
        id={`accordion-${id}`}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
        className={`grid ${
          bodyClassName ?? " "
        } text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {textBody ? <Text className="pb-3">{textBody}</Text> : bodyChildren}
        </div>
      </div>
    </div>
  );
}
