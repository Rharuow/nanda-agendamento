import { addDoc } from "firebase/firestore";
import { Patient } from "..";
import { patientsCollection } from "../collections";

export const createPatient = async (data: Patient) => {
  try {
    const patient = await addDoc(patientsCollection, data);
    return patient;
  } catch (error: any) {
    console.log("create Patient", error);
    throw new Error("CREATE PATIENT", error);
  }
};
