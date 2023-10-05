import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const deleteSchedule = async ({ id }: { id: string }) => {
  try {
    await deleteDoc(doc(db, "schedules", id));
  } catch (error: any) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};
