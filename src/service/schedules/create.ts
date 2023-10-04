import { addDoc, doc, updateDoc } from "firebase/firestore";
import { Schedule } from "..";
import { schedulesCollection, studentsCollection } from "../collections";
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
  try {
    const hasStudent = await getStudentByName({ name: schedule.name });
    if (hasStudent) {
      const scheduleDoc = await addDoc(studentsCollection, {
        ...scheduleFormatted,
        student_id: hasStudent.id,
      } as Schedule);
      const studentRef = doc(db, "students", String(hasStudent.id));
      updateDoc(studentRef, {
        ...hasStudent,
        schedules_id: [...(hasStudent.schedules_id as Array<string>)],
      });
      return scheduleDoc;
    }
    const scheduleDoc = await addDoc(schedulesCollection, scheduleFormatted);
    const studentId = (
      await createStudent({
        name: schedule.name,
        schedules_id: [scheduleDoc.id],
      })
    ).id;
    const scheduleRef = doc(db, "schedules", scheduleDoc.id);
    await updateDoc(scheduleRef, {
      student_id: studentId,
    });
    return scheduleDoc;
  } catch (error: any) {
    console.log("error to create schedule = ", error);
    throw new Error(`${error.message}`);
  }
};
