import { getDocs } from "firebase/firestore";
import { studentsCollection } from "../collections";
import { Student } from "..";

export const listStudents = async () => {
  try {
    return (await getDocs(studentsCollection)).docs.map((student) => ({
      ...student.data(),
      id: student.id,
    })) as Array<Student>;
  } catch (error: any) {
    console.log("listStudent = ", error);
    throw new Error(`${error.message}`);
  }
};
