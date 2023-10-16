import { getDocs, query, where } from "firebase/firestore";
import { patientsCollection } from "../collections";
import { Patient } from "..";

export const getPatientByName = async ({ name }: { name: string }) => {
  try {
    const q = query(patientsCollection, where("name", "==", name));
    const patient = (await getDocs(q)).docs[0];
    if (patient) return { ...patient.data(), id: patient.id } as Patient;
  } catch (error: any) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};
