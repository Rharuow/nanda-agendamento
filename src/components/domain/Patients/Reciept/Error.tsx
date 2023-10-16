import Lottie from "lottie-react";
import React from "react";

import error from "@/public/error.json";
import { Text } from "@/src/components/Text";
import { Button } from "@/src/components/Button";

export const Error = ({
  action,
  buttonText,
}: {
  action: () => void;
  buttonText: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-1 px-9">
      <div className="px-9">
        <Lottie animationData={error} loop={true} />
      </div>
      <Text className="text-center">Opss, houve um erro aqui...</Text>
      <Button text={buttonText} onClick={() => action()} />
    </div>
  );
};
