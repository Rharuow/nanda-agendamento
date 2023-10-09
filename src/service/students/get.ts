import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Schedule, Student } from "..";
import { listSchedules } from "../schedules";

export const getStudent = async ({
  id,
  withSchedules,
}: {
  id: string;
  withSchedules?: boolean;
}) => {
  try {
    const docStudentRef = doc(db, "students", id);
    const student = await getDoc(docStudentRef);
    if (student)
      return withSchedules
        ? await nestStudentSchedules({
            ...student.data(),
            id: student.id,
          } as Student)
        : { ...(student.data() as Student), id: student.id, schedules: [] };
    throw new Error("Student não encontrado.");
  } catch (error: any) {
    console.log(error);
    throw new Error(`get student ${error.message}`);
  }
};

export const nestStudentSchedules = async (student: Student) => {
  try {
    const schedules = await listSchedules();
    return {
      ...student,
      schedules: schedules.filter((schedule) =>
        student.schedules_id?.some((sche) => sche === schedule.id)
      ),
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(`nested student schedules ${error.message}`);
  }
};
