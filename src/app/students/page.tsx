"use client";
import { Menu } from "@/src/components/Menu";
import { List } from "@/src/components/domain/Student/List";
import { items } from "@/src/utils/menu";
import { List as ListIcon } from "@phosphor-icons/react";
import React, { useState } from "react";

const Students = () => {
  const [showMenu, setShowMenu] = useState<boolean>();
  return (
    <main className="min-h-screen p-3 flex flex-col">
      {showMenu !== undefined && (
        <Menu show={showMenu} setShow={setShowMenu} items={items} />
      )}
      <div
        className="flex absolute right-3"
        onClick={() => {
          setShowMenu(true);
        }}
      >
        <ListIcon className="text-white self-end" size={24} />
      </div>
      <List />
    </main>
  );
};

export default Students;
