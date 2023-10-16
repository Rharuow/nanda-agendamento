"use client";
import { Menu } from "@/src/components/Menu";
import { Text } from "@/src/components/Text";
import { ListSchedules } from "@/src/components/domain/Patients/Schedules/List";
import { ArrowCircleLeft, List } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { items } from "../utils/items";

export default function Schedules() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>();
  return (
    <main className="min-h-screen flex flex-col p-3">
      <div className="flex justify-between items-center">
        <Text onClick={() => router.back()}>
          <ArrowCircleLeft size={28} />
        </Text>
        <Text className="font-bold">Agendamentos</Text>
        <Text onClick={() => setShowMenu(true)}>
          <List size={24} />
        </Text>
      </div>
      {showMenu !== undefined && (
        <Menu show={showMenu} setShow={setShowMenu} items={items} />
      )}
      <ListSchedules />
    </main>
  );
}
