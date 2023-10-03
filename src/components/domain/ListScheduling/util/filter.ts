import { Schedule, Student } from "@/src/service";
import dayjs from "dayjs";

export const filters = ({
  schedules,
  kind,
  students,
  param,
}: {
  schedules: Array<Schedule & { student?: Student }>;
  kind: "name" | "startToNow";
  students: Array<Student>;
  param?: string;
}) => {
  switch (kind) {
    case "name":
      return schedules.map((sche) => ({
        ...sche,
        student: students.find((student) => student.name === param),
      }));
    case "startToNow":
      return schedules.filter((sche) => dayjs(sche.date).isAfter(dayjs()));
    default:
      return schedules;
  }
};
