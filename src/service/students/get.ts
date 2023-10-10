import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Schedule, Student } from "..";
import { listSchedules } from "../schedules";

export const getStudent = async ({ id }: { id: string }) => {
  try {
    const docStudentRef = doc(db, "students", id);
    const student = await getDoc(docStudentRef);
    if (student) return { ...(student.data() as Student), id: student.id };
    throw new Error("Student não encontrado.");
  } catch (error: any) {
    console.log(error);
    throw new Error(`get student ${error.message}`);
  }
};
