"use client";
import React from "react";
import { Scheduling } from "@/src/components/domain/Scheduling";

import "react-calendar/dist/Calendar.css";

const page = () => {
  return (
    <main className="flex min-h-screen p-3">
      <Scheduling />
    </main>
  );
};

export default page;
