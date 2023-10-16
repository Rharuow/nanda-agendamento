import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Patient } from "..";

export const getPatient = async ({ id }: { id: string }) => {
  try {
    const docPatientRef = doc(db, "patients", id);
    const patient = await getDoc(docPatientRef);
    if (patient) return { ...(patient.data() as Patient), id: patient.id };
    throw new Error("Patient não encontrado.");
  } catch (error: any) {
    console.log(error);
    throw new Error(`get patient ${error.message}`);
  }
};
