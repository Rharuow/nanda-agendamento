import { getDocs } from "firebase/firestore";
import { patientsCollection } from "../collections";
import { Schedule, Student } from "..";
import { FilterType } from "./types";

export const listPatients: (
  filter?: FilterType
) => Promise<
  Array<Student | (Student & { schedules: Array<Schedule> })>
> = async (filter?: FilterType) => {
  try {
    const patients = await getDocs(patientsCollection);
    if (patients.empty) return [];
    return patients.docs.map((patient) => ({
      ...patient.data(),
      id: patient.id,
    })) as Array<Student>;
  } catch (error: any) {
    console.log("listPatients = ", error);
    throw new Error(`${error.message}`);
  }
};
