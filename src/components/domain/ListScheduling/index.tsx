import Lottie from "lottie-react";

import { listSchedules } from "@/src/service/api";

import empty from "@/public/empty.json";
import { Button } from "../../Button";
import Link from "next/link";
import { Text } from "../../Text";
import { Empty } from "./Empty";

export const ListScheduling = () => {
  const schedules = listSchedules();

  return <div>{schedules.length > 0 ? <Text>LISTAR</Text> : <Empty />}</div>;
};
