"use client";
import { useRouter } from "next/navigation";
import { Button } from "../components/Button";

export default function Home() {
  const { push } = useRouter();

  return (
    <main className="flex w-full min-h-screen">
      <style jsx global>
        {`
          body {
            background: rgba(30, 30, 30, 0.9);
          }
        `}
      </style>
      <div className="flex w-full">
        <Button
          className="grow text-white"
          variant="outline"
          text="Aulas"
          onClick={() => push("/students")}
        />
      </div>
      <div className="flex w-full">
        <Button
          className="grow"
          variant="secondary"
          onClick={() => push("/patients")}
          text="Fisioterapia"
        />
      </div>
    </main>
  );
}
