import { Schedule, Student } from "../..";
import dayjs from "dayjs";
import { FilterType } from "./types";
import { listStudents } from "../../students";

export const listSchedules = async (filter?: FilterType) => {
  try {
    const students = await listStudents();
    const schedules = students
      .map((student) =>
        student.schedules && student.schedules.length > 0
          ? student.schedules.map((schedule, index) => ({
              ...schedule,
              student,
              position: index,
            }))
          : []
      )
      .flat();
    return filter && schedules && schedules.length > 0
      ? filterSchedules({
          filter,
          schedules: schedules as Array<
            Schedule & { student: Student; position: number }
          >,
        })
      : schedules;
  } catch (error: any) {
    console.log("listStudent = ", error);
    throw new Error(`${error.message}`);
  }
};

export const filterSchedules = ({
  filter,
  schedules,
}: {
  filter: FilterType;
  schedules: Array<Schedule & { student: Student; position: number }>;
}) => {
  const { q } = filter;
  const params = Object.keys(q);
  let schedulesFiltred = schedules;
  schedulesFiltred = params.some((param) => param === "studentName")
    ? schedulesFiltred.filter(
        (schedule) => schedule.student.name === q.studentName
      )
    : schedulesFiltred;

  schedulesFiltred = params.some((param) => param === "startOfNow")
    ? schedulesFiltred.filter((schedule) =>
        dayjs(schedule.date).isAfter(dayjs().subtract(1, "day"))
      )
    : schedulesFiltred;

  schedulesFiltred = params.some((param) => param === "startOfDate")
    ? schedulesFiltred.filter((schedule) =>
        dayjs(schedule.date).isAfter(dayjs(q.startOfDate).subtract(1, "day"))
      )
    : schedulesFiltred;

  schedulesFiltred = params.some((param) => param === "endOfDate")
    ? schedulesFiltred.filter((schedule) =>
        dayjs(schedule.date).isBefore(dayjs(q.endOfDate).add(1, "day"))
      )
    : schedulesFiltred;

  schedulesFiltred = params.some((param) => param === "paid")
    ? schedulesFiltred.filter((schedule) => schedule.paid === q.paid)
    : schedulesFiltred;

  return schedulesFiltred;
};
