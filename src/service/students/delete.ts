import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const deleteStudente = async ({ id }: { id: string }) => {
  try {
    const studentRef = doc(db, "students", id);
    await deleteDoc(studentRef);
    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error("delete student error = " + error.message);
  }
};
