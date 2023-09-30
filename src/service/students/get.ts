import { getDocs, query, where } from "firebase/firestore";
import { studentsCollection } from "../collections";

export const getStudent = async (id: string) => {
  try {
    const q = query(studentsCollection, where("id", "==", id));
    const student = (await getDocs(q)).docs[0];
    if (student) return { ...student.data(), id: student.id };
    throw new Error("Student não encontrado.");
  } catch (error: any) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};
