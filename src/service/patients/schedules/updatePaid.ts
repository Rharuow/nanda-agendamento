import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Patient } from "../..";

export const updatePaid = async ({
  id,
  patient,
}: {
  id: number;
  patient: Patient;
}) => {
  try {
    const patientRef = doc(db, "patients", String(patient.id));

    const patientDoc = await updateDoc(patientRef, {
      schedules: patient.schedules.map((schedule, index) =>
        index === id ? { ...schedule, paid: !schedule?.paid } : schedule
      ),
    });
    return patientDoc;
  } catch (error: any) {
    console.log("(patient) error to update paid schedule = ", error);
    throw new Error(`${error.message}`);
  }
};
