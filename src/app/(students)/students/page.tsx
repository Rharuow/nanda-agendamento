"use client";
import { Menu } from "@/src/components/Menu";
import { Text } from "@/src/components/Text";
import { List } from "@/src/components/domain/Students/Student/List";
import { ArrowCircleLeft, List as ListIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { items } from "./utils/items";

const Students = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>();
  return (
    <main className="min-h-screen p-3 flex flex-col">
      <div className="flex justify-between items-center bg-[--body-color] sticky top-0 z-50">
        <Text onClick={() => router.back()}>
          <ArrowCircleLeft size={28} />
        </Text>
        <Text className="font-bold">Alunos</Text>
        <Text onClick={() => setShowMenu(true)}>
          <ListIcon className="text-white self-end" size={24} />
        </Text>
      </div>
      {showMenu !== undefined && (
        <Menu show={showMenu} setShow={setShowMenu} items={items} />
      )}
      <List />
    </main>
  );
};

export default Students;
