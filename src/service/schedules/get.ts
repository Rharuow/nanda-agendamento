import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Student } from "..";

export const getSchedule = async ({
  id,
  position,
}: {
  id: string;
  position: number;
}) => {
  try {
    const studentRef = doc(db, "students", id);
    const studentDoc = await getDoc(studentRef);
    if (studentDoc.exists()) {
      const student = { ...studentDoc.data(), id: studentDoc.id } as Student;
      return student.schedules.find((_, index) => index === position);
    }
    throw new Error("Schedule não encontrado.");
  } catch (error: any) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};
