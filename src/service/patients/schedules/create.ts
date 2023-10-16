import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Patient } from "../..";
import { FormCreateScheduling } from "@/src/components/domain/Patients/Schedules/New";
import { getPatientByName } from "../getPatientByName";
import { createPatient } from "../create";

export const createScheduling = async ({
  name,
  ...scheduleData
}: FormCreateScheduling) => {
  const schedule = {
    amountTime: scheduleData.amount,
    date: scheduleData.date,
    paid: false,
    pricePerTime: parseFloat(scheduleData.price.replace(",", ".")),
  };

  try {
    const hasPatient = await getPatientByName({ name });
    if (hasPatient) {
      const patientRef = doc(db, "patients", String(hasPatient.id));
      await updateDoc(patientRef, {
        debitTotal:
          hasPatient.debitTotal + schedule.amountTime * schedule.pricePerTime,
        schedules: [...hasPatient.schedules, schedule],
        totalTime: hasPatient.schedules.reduce(
          (acc, curr) => (curr?.amountTime ? acc + curr?.amountTime : 0),
          0
        ),
      });
      return hasPatient;
    }

    const patient: Patient = {
      name,
      debitTotal: schedule.amountTime * schedule.pricePerTime,
      schedules: [schedule],
      totalTime: schedule.amountTime,
    };

    const patientId = (await createPatient(patient)).id;

    return patientId;
  } catch (error: any) {
    console.log("(patient) error to create schedule = ", error);
    throw new Error(`${error.message}`);
  }
};
