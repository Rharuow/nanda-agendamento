"use client";
import { Menu } from "@/src/components/Menu";
import { List } from "@/src/components/domain/Student/List";
import { items } from "@/src/utils/menu";
import { List as ListIcon } from "@phosphor-icons/react";
import React, { useState } from "react";

const Patients = () => {
  const [showMenu, setShowMenu] = useState<boolean>();
  return (
    <main className="min-h-screen p-3 flex flex-col">
      <List />
    </main>
  );
};

export default Patients;
