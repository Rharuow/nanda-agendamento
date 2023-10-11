"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { ListScheduling } from "@/src/components/domain/ListScheduling";
import { SignIn } from "@/src/components/domain/SignIn";
import { Loading } from "../components/Loading";
import { BookBookmark, Student } from "@phosphor-icons/react";
import { Menu } from "../components/Menu";
import { items } from "../utils/menu";

export default function Home() {
  const [user, setUser] = useState<string>();
  const [showMenu, setShowMenu] = useState<boolean>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(Cookies.get("user"));
    setLoading(false);
  }, []);

  return (
    <main className="min-h-screen p-3">
      {showMenu !== undefined && (
        <Menu show={showMenu} setShow={setShowMenu} items={items} />
      )}
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
