import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Student } from "..";

export const deleteSchedule = async ({
  id,
  student,
}: {
  id: number;
  student: Student;
}) => {
  try {
    const studentRef = doc(db, "students", String(student.id));
    const studentUpdated = await updateDoc(studentRef, {
      schedules: student.schedules.filter((_, index) => index !== id),
    });
    return studentUpdated;
  } catch (error: any) {
    console.log(error);
    throw new Error(`deleteSchedule = ${error.message}`);
  }
};
