"use client";
import React from "react";
import { Scheduling } from "@/src/components/domain/Scheduling";
import { useSessionContext } from "@/src/context/session";
import { List } from "@phosphor-icons/react";

const Schedule = () => {
  const { setShowMenu } = useSessionContext();

  return (
    <main className="min-h-screen p-3">
      <div
        className="flex"
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
