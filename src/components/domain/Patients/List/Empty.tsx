import Lottie from "lottie-react";
import React from "react";

import empty from "@/public/empty.json";
import { Text } from "@/src/components/Text";
import { Button } from "@/src/components/Button";

export const Empty = ({ action }: { action: () => void }) => {
  return (
    <div className="flex flex-col items-center gap-1 px-9">
      <div className="px-9">
        <Lottie animationData={empty} loop={true} />
      </div>
      <Text className="text-center">Nenhum paciente encontrado...</Text>
      <Button text="Cadastrar" onClick={action} />
    </div>
  );
};
