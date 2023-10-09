import { getDocs } from "firebase/firestore";
import { studentsCollection } from "../collections";
import { Schedule, Student } from "..";
import { listSchedules } from "../schedules";
import { FilterType } from "./types";

export const listStudents: (
  filter?: FilterType
) => Promise<
  Array<Student | (Student & { schedules: Array<Schedule> })>
> = async (filter?: FilterType) => {
  try {
    const students = (await getDocs(studentsCollection)).docs.map(
      (student) => ({
        ...student.data(),
        id: student.id,
      })
    ) as Array<Student>;
    return filter ? await studentsWithSchedules(students) : students;
  } catch (error: any) {
    console.log("listStudent = ", error);
    throw new Error(`${error.message}`);
  }
};

export const studentsWithSchedules = async (students: Array<Student>) => {
  try {
    const schedules = await listSchedules();

    return students.map((student) => {
      return schedules.some((schedule) => schedule.student_id === student.id)
        ? {
            ...student,
            schedules: schedules.filter(
              (schedule) => schedule.student_id === student.id
            ),
          }
        : { ...student, schedules: [] };
    });
  } catch (error: any) {
    console.log("error studentWithSchedules = ", error);
    throw new Error(error);
  }
};
