"use client";
import { Menu } from "@/src/components/Menu";
import { Text } from "@/src/components/Text";
import { ArrowCircleLeft, List } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { items } from "./utils/items";
import { useThemeContext } from "@/src/context/theme";

const Patients = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>();
  const { theme } = useThemeContext();
  console.log(theme);
  return (
    <main className="min-h-screen p-3 flex flex-col">
      <div className="flex justify-between items-center">
        <Text onClick={() => router.back()}>
          <ArrowCircleLeft size={28} />
        </Text>
        <Text className="font-bold">Agendamentos</Text>
        <Text onClick={() => setShowMenu(true)}>
          <List className=" self-end" size={24} />
        </Text>
      </div>
      {showMenu !== undefined && (
        <Menu show={showMenu} setShow={setShowMenu} items={items} />
      )}
    </main>
  );
};

export default Patients;
