import Lottie from "lottie-react";

import { listSchedules } from "@/service/api";

export const ListScheduling = () => {
  const schedules = listSchedules();

  return <div>{schedules.length > 0 ? <>LISTAR</> : <>VAZIO</>}</div>;
};
