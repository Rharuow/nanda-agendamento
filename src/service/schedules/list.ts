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
  const params = Object.keys(q);
  let schedulesFiltred = schedules;
  schedulesFiltred = params.some((param) => param === "studentName")
    ? schedulesFiltred.filter((schedule) => schedule.student_id === student?.id)
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

  return schedulesFiltred;
};
