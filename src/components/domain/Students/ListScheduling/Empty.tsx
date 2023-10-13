import Lottie from "lottie-react";
import React from "react";
import { Text } from "../../../Text";
import Link from "next/link";
import { Button } from "../../../Button";

import empty from "@/public/empty.json";

export const Empty = () => {
  return (
    <div className="flex flex-col items-center gap-1 px-9">
      <div className="px-9">
        <Lottie animationData={empty} loop={true} />
      </div>

      <Text className="text-center">Nenhum agendamento encontrado...</Text>
      <Link href="/students/schedules/new">
        <Button text="Agendar" />
      </Link>
    </div>
  );
};
