import { Student } from "..";
import dayjs from "dayjs";
import { FilterType } from "./types";
import { listStudents } from "../students";

export const listSchedules = async (filter?: FilterType) => {
  try {
    const students = await listStudents();
    const schedules = students
      .map((student) => ({ ...student.schedules, student }))
      .flat();
    console.log(schedules);
    return students;
  } catch (error: any) {
    console.log("listStudent = ", error);
    throw new Error(`${error.message}`);
  }
};

export const filterSchedules = ({
  filter,
  student,
}: {
  filter: FilterType;
  student?: Student;
}) => {
  const { q } = filter;
  const params = Object.keys(q);
  student;
  return student;
};
