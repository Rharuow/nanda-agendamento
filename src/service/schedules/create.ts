import { doc, updateDoc } from "firebase/firestore";
import { FormCreateScheduling } from "@/src/components/domain/Scheduling";
import { createStudent, getStudentByName } from "../students";
import { db } from "../firebase";

export const createScheduling = async (schedule: FormCreateScheduling) => {
  const { name, ...scheduleData } = schedule;
  const scheduleFormatted = {
    amountTime: scheduleData.amount,
    date: schedule.date,
    paid: false,
    pricePerTime: parseFloat(schedule.price.replace(",", ".")),
  };
  const hasStudent = await getStudentByName({ name });
  try {
    if (hasStudent) {
      const studentRef = doc(db, "students", String(hasStudent.id));
      await updateDoc(studentRef, {
        ...hasStudent,
        schedules: [...hasStudent.schedules, scheduleFormatted],
      });
      return hasStudent;
    }

    const studentId = (
      await createStudent({
        name: schedule.name,
        schedules: [scheduleFormatted],
      })
    ).id;

    return studentId;
  } catch (error: any) {
    console.log("error to create schedule = ", error);
    throw new Error(`${error.message}`);
  }
};
