import { getDocs } from "firebase/firestore";
import { schedulesCollection } from "../collections";
import { Schedule, Student } from "..";
import dayjs from "dayjs";
import { FilterType } from "./types";
import { getStudentByName, listStudents } from "../students";

export const listSchedules = async (filter?: FilterType) => {
  try {
    const students = await listStudents();

    const schedules = (
      (await getDocs(schedulesCollection)).docs.map((schedule) => ({
        ...schedule.data(),
        id: schedule.id,
      })) as Array<Schedule>
    )
      .sort((current, next) => {
        return dayjs(current.date).isBefore(dayjs(next.date)) ? 0 : -1;
      })
      .map((schedule) => ({
        ...schedule,
        student: students.find((std) =>
          std.schedules_id?.includes(schedule.id)
        ) as Student,
      }));

    const student: Student | undefined =
      filter && Object.keys(filter.q).some((param) => param === "studentName")
        ? ((await getStudentByName({
            name: String(filter.q.studentName),
          })) as Student)
        : undefined;

    return filter ? filterSchedules({ filter, schedules, student }) : schedules;
  } catch (error: any) {
    console.log("listStudent = ", error);
    throw new Error(`${error.message}`);
  }
};

export const filterSchedules = ({
  filter,
  schedules,
  student,
}: {
  filter: FilterType;
  schedules: Array<Schedule & { student: Student }>;
  student?: Student;
}) => {
  const { q } = filter;
  console.log("q = ", q);
  console.log("schedules = ", schedules);
  const params = Object.keys(q);
  let schedulesFiltred = student
    ? schedules.filter((schedule) => schedule.student_id === student.id)
    : schedules;

  schedulesFiltred = params.some((param) => param === "startOfNow")
    ? schedules.filter((schedule) => dayjs(schedule.date).isAfter(dayjs()))
    : schedulesFiltred;

  schedulesFiltred = params.some((param) => param === "startOfDate")
    ? schedules.filter((schedule) =>
        dayjs(schedule.date).isAfter(dayjs(q.startOfDate))
      )
    : schedulesFiltred;

  schedulesFiltred = params.some((param) => param === "endOfDate")
    ? schedules.filter((schedule) =>
        dayjs(schedule.date).isBefore(dayjs(q.endOfDate))
      )
    : schedulesFiltred;

  return schedulesFiltred;
};
