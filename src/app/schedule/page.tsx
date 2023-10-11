"use client";
import React, { useState } from "react";
import { Scheduling } from "@/src/components/domain/Scheduling";
import { Menu } from "@/src/components/Menu";
import { items } from "@/src/utils/menu";
import { List } from "@phosphor-icons/react";

const Schedule = () => {
  const [showMenu, setShowMenu] = useState<boolean>();
  return (
    <main className="min-h-screen p-3">
      {showMenu !== undefined && (
        <Menu show={showMenu} setShow={setShowMenu} items={items} />
      )}
      <div
        className="flex absolute right-3"
        onClick={() => {
          setShowMenu(true);
        }}
      >
        <List className="text-white self-end" size={24} />
      </div>
      <Scheduling />
    </main>
  );
};

export default Schedule;
