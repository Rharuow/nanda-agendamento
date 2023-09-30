import { getDocs, query, where } from "firebase/firestore";
import { studentsCollection } from "../collections";
import { Student } from "..";

export const getStudentByName = async ({ name }: { name: string }) => {
  try {
    const q = query(studentsCollection, where("name", "==", name));
    const student = (await getDocs(q)).docs[0];
    if (student) return { ...student.data(), id: student.id } as Student;
    throw new Error("Student não encontrado.");
  } catch (error: any) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};
