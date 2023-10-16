import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const deletePatient = async ({ id }: { id: string }) => {
  try {
    const patientRef = doc(db, "patients", id);
    await deleteDoc(patientRef);
    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error("delete patient error = " + error.message);
  }
};
