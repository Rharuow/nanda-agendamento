"use client";
import { Menu } from "@/src/components/Menu";
import { Text } from "@/src/components/Text";
import { ArrowCircleLeft, List } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { items } from "./utils/items";
import { ListPatients } from "@/src/components/domain/Patients/List";

const Patients = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>();
  return (
    <main className="min-h-screen p-3 flex flex-col relative">
      <div className="flex justify-between items-center bg-[--body-color] sticky top-0 z-50">
        <Text onClick={() => router.back()}>
          <ArrowCircleLeft size={28} />
        </Text>
        <Text className="font-bold">Pacientes</Text>
        <Text onClick={() => setShowMenu(true)}>
          <List className="self-end" size={24} />
        </Text>
      </div>
      {showMenu !== undefined && (
        <Menu show={showMenu} setShow={setShowMenu} items={items} />
      )}
      <ListPatients />
    </main>
  );
};

export default Patients;
