import Lottie from "lottie-react";

import { listSchedules } from "@/src/service/api";

import empty from "@/public/empty.json";
import { Button } from "../Button";
import Link from "next/link";

export const ListScheduling = () => {
  const schedules = listSchedules();

  return (
    <div>
      {schedules.length > 0 ? (
        <>LISTAR</>
      ) : (
        <div className="flex flex-col items-center gap-1 px-9">
          <div className="px-9">
            <Lottie animationData={empty} loop={true} />
          </div>
          <p>Nenhum agendamento encontrado...</p>
          <Link href="/schedule">
            <Button text="Agendar" />
          </Link>
        </div>
      )}
    </div>
  );
};
