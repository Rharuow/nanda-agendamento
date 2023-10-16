import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Patient } from "../..";

export const deleteSchedule = async ({
  id,
  patient,
}: {
  id: number;
  patient: Patient;
}) => {
  try {
    const patientRef = doc(db, "patients", String(patient.id));
    const patientUpdated = await updateDoc(patientRef, {
      schedules: patient.schedules.filter((_, index) => index !== id),
    });
    return patientUpdated;
  } catch (error: any) {
    console.log(error);
    throw new Error(`(patient) deleteSchedule = ${error.message}`);
  }
};
