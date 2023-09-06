"use client";
import { Scheduling } from "@/components/domain/Scheduling";
import { SignIn } from "@/components/domain/SignIn";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
    <main className="flex min-h-screen flex-col items-center justify-around gap-3">
      {user ? <Scheduling /> : <SignIn setUser={setUser} />}
    </main>
  );
}
