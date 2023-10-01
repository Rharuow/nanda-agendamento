import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getStudent = async (id: string) => {
  try {
    const docStudentRef = doc(db, "students", id);
    const student = await getDoc(docStudentRef);
    if (student) return { ...student.data(), id: student.id };
    throw new Error("Student não encontrado.");
  } catch (error: any) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};
