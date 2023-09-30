"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { ListScheduling } from "@/src/components/domain/ListScheduling";
import { SignIn } from "@/src/components/domain/SignIn";

export default function Home() {
  const [user, setUser] = useState<string>();

  useEffect(() => {
    setUser(Cookies.get("user"));
  }, []);

  return (
    <main className="flex w-full min-h-screen items-center justify-center px-3">
      {user ? <ListScheduling /> : <SignIn setUser={setUser} />}
    </main>
  );
}
