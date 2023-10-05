import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Schedule } from "..";

export const getSchedule = async (id: string) => {
  try {
    const scheduleRef = doc(db, "schedules", id);
    const schedule = await getDoc(scheduleRef);
    if (schedule) return { ...schedule.data(), id: schedule.id } as Schedule;
    throw new Error("Schedule não encontrado.");
  } catch (error: any) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};
