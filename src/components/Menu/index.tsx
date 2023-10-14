import { Icon, XCircle } from "@phosphor-icons/react";
import classNames from "classnames";
import React, { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { Text } from "../Text";
import Link from "next/link";
import { useThemeContext } from "@/src/context/theme";

export const Menu = ({
  show,
  setShow,
  items,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean | undefined>>;
  items: Array<{ icon: Icon; label: string; route: string }>;
}) => {
  const { theme } = useThemeContext();
  return createPortal(
    <div className="flex flex-row-reverse">
      <div
        className={classNames(
          "absolute flex gap-3 flex-col overflow-hidden top-0 bg-slate-400 z-50 h-screen w-screen",
          {
            "animate-menuOpen": show,
            "animate-menuClose": !show,
          }
        )}
      >
        <div
          className={classNames("flex self-end", {
            "animate-easeOut": !show,
            "animate-easeIn": show,
          })}
          onClick={() => setShow(false)}
        >
          <XCircle
            size={38}
            className={classNames({ "text-white": !theme || theme === "dark" })}
          />
        </div>
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center gap-2">
              <Link href={item.route}>
                <Text
                  className="text-[20px] font-bold"
                  onClick={() => setShow(false)}
                >
                  <Icon />
                </Text>
              </Link>
              <Link href={item.route}>
                <Text
                  className="text-[20px] font-bold"
                  onClick={() => setShow(false)}
                >
                  {item.label}
                </Text>
              </Link>
            </div>
          );
        })}
      </div>
    </div>,
    document.body
  );
};
