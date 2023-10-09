"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { ListScheduling } from "@/src/components/domain/ListScheduling";
import { SignIn } from "@/src/components/domain/SignIn";
import { Loading } from "../components/Loading";

export default function Home() {
  const [user, setUser] = useState<string>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(Cookies.get("user"));
    setLoading(false);
  }, []);

  return (
    <main className="min-h-screen p-3">
      {loading ? (
        <div className="flex flex-col h-screen items-center justify-center">
          <Loading />
        </div>
      ) : user !== undefined ? (
        <ListScheduling />
      ) : (
        <SignIn setUser={setUser} />
      )}
    </main>
  );
}
