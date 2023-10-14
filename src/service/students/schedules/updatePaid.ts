import { doc, updateDoc } from "firebase/firestore";
import { Student } from "../..";
import { db } from "../../firebase";

export const updatePaid = async ({
  id,
  student,
}: {
  id: number;
  student: Student;
}) => {
  try {
    const studentRef = doc(db, "students", String(student.id));

    const studentDoc = await updateDoc(studentRef, {
      schedules: student.schedules.map((schedule, index) =>
        index === id ? { ...schedule, paid: !schedule?.paid } : schedule
      ),
    });
    return studentDoc;
  } catch (error: any) {
    console.log("error to update paid schedule = ", error);
    throw new Error(`${error.message}`);
  }
};
