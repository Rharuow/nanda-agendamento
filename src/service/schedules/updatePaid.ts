import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getSchedule } from ".";

export const updatePaid = async ({ id }: { id: string }) => {
  try {
    const schedule = await getSchedule(id);
    const scheduleRef = doc(db, "schedules", id);
    await updateDoc(scheduleRef, {
      paid: !schedule.paid,
    });
    return schedule;
  } catch (error: any) {
    console.log("error to update paid schedule = ", error);
    throw new Error(`${error.message}`);
  }
};
