import { getDocs, query, where } from "firebase/firestore";
import { schedulesCollection } from "../collections";

export const getSchedule = async (id: string) => {
  try {
    const q = query(schedulesCollection, where("id", "==", id));
    const schedule = (await getDocs(q)).docs[0];
    if (schedule) return { ...schedule.data(), id: schedule.id };
    throw new Error("Schedule não encontrado.");
  } catch (error: any) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};
