"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { ListScheduling } from "@/src/components/domain/ListScheduling";
import { SignIn } from "@/src/components/domain/SignIn";

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

export default function Home() {
  const [user, setUser] = useState<string>();

  useEffect(() => {
    setUser(Cookies.get("user"));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center px-3">
      {user ? <ListScheduling /> : <SignIn setUser={setUser} />}
    </main>
  );
}
