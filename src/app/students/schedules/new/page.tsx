"use client";
import React, { useState } from "react";
import { Scheduling } from "@/src/components/domain/Students/Scheduling";
import { Text } from "@/src/components/Text";
import { useRouter } from "next/navigation";
import { ArrowCircleLeft, List } from "@phosphor-icons/react";
import { Menu } from "@/src/components/Menu";
import { items } from "../../utils/items";

const Schedule = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>();
  return (
    <main className="min-h-screen flex flex-col p-3">
      <div className="flex justify-between items-center">
        <Text onClick={() => router.back()}>
          <ArrowCircleLeft size={28} />
        </Text>
        <Text className="font-bold">Criar agendamento</Text>
        <Text onClick={() => setShowMenu(true)}>
          <List className="text-white self-end" size={24} />
        </Text>
      </div>
      {showMenu !== undefined && (
        <Menu show={showMenu} setShow={setShowMenu} items={items} />
      )}
      <Scheduling />
    </main>
  );
};

export default Schedule;
