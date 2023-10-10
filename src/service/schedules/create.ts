import { doc, updateDoc } from "firebase/firestore";
import { FormCreateScheduling } from "@/src/components/domain/Scheduling";
import { createStudent, getStudentByName } from "../students";
import { db } from "../firebase";
import { Student } from "..";

export const createScheduling = async ({
  name,
  ...scheduleData
}: FormCreateScheduling) => {
  const schedule = {
    amountTime: scheduleData.amount,
    date: scheduleData.date,
    paid: false,
    pricePerTime: parseFloat(scheduleData.price.replace(",", ".")),
  };

  try {
    const hasStudent = await getStudentByName({ name });
    if (hasStudent) {
      const studentRef = doc(db, "students", String(hasStudent.id));
      await updateDoc(studentRef, {
        debitTotal:
          hasStudent.debitTotal + schedule.amountTime * schedule.pricePerTime,
        schedules: [...hasStudent.schedules, schedule],
        totalTime: hasStudent.schedules.reduce(
          (acc, curr) => (curr?.amountTime ? acc + curr?.amountTime : 0),
          0
        ),
      });
      return hasStudent;
    }

    const student: Student = {
      name,
      debitTotal: schedule.amountTime * schedule.pricePerTime,
      schedules: [schedule],
      totalTime: schedule.amountTime,
    };

    const studentId = (await createStudent(student)).id;

    return studentId;
  } catch (error: any) {
    console.log("error to create schedule = ", error);
    throw new Error(`${error.message}`);
  }
};
