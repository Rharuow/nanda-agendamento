import { getSchedulesWithStudent } from "@/src/service/api";

import { Empty } from "./Empty";
import { List } from "./List";

export const ListScheduling = () => {
  const schedules = getSchedulesWithStudent();

  return schedules.length > 0 ? <List schedules={schedules} /> : <Empty />;
};
