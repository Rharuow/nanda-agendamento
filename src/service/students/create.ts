import { addDoc } from "firebase/firestore";
import { Student } from "..";
import { studentsCollection } from "../collections";

export const createStudent = async (student: Student) => {
  try {
    const studentDoc = await addDoc(studentsCollection, student);
    return studentDoc;
  } catch (error: any) {
    console.log("error to create students = ", error);
    throw new Error(`${error.message}`);
  }
};
