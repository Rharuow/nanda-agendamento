import { getDocs } from "firebase/firestore";
import { studentsCollection } from "../collections";
import { Schedule, Student } from "..";
import { FilterType } from "./types";

export const listStudents: (
  filter?: FilterType
) => Promise<
  Array<Student | (Student & { schedules: Array<Schedule> })>
> = async (filter?: FilterType) => {
  try {
    const students = await getDocs(studentsCollection);
    if (students.empty) return [];
    return students.docs.map((student) => ({
      ...student.data(),
      id: student.id,
    })) as Array<Student>;
  } catch (error: any) {
    console.log("listStudent = ", error);
    throw new Error(`${error.message}`);
  }
};
