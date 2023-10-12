"use client";
import { Menu } from "@/src/components/Menu";
import { List } from "@phosphor-icons/react";
import { useState } from "react";
import { items } from "./utils/items";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMenu, setShowMenu] = useState<boolean>();
  return (
    <>
      <List
        className="text-white self-end"
        style={{ position: "absolute", top: "8px", right: "8px" }}
        onClick={() => setShowMenu(true)}
        size={24}
      />
      {showMenu !== undefined && (
        <Menu show={showMenu} setShow={setShowMenu} items={items} />
      )}
      {children}
    </>
  );
}
