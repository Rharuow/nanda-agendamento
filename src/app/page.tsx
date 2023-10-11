"use client";
import { useRouter } from "next/navigation";
import { Button } from "../components/Button";

export default function Home() {
  const { push } = useRouter();

  return (
    <main className="flex w-full min-h-screen">
      <div className="flex w-full">
        <Button
          className="grow"
          variant="outline"
          text="Aulas"
          onClick={() => push("/schedules")}
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
