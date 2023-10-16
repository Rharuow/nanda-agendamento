import { getDocs } from "firebase/firestore";
import { patientsCollection } from "../collections";
import { Patient, Schedule } from "..";
import { FilterType } from "./types";

export const listPatients: (
  filter?: FilterType
) => Promise<
  Array<Patient | (Patient & { schedules: Array<Schedule> })>
> = async (filter?: FilterType) => {
  try {
    const patientsDoc = await getDocs(patientsCollection);
    if (patientsDoc.empty) return [];
    const patients = patientsDoc.docs.map((patient) => ({
      ...patient.data(),
      id: patient.id,
    })) as Array<Patient>;
    return filter ? filterPatients({ patients, params: filter }) : patients;
  } catch (error: any) {
    console.log("listPatients = ", error);
    throw new Error(`${error.message}`);
  }
};

export const filterPatients = ({
  patients,
  params,
}: {
  patients: Array<Patient>;
  params: FilterType;
}) => {
  let patientsFiltered = patients;

  const { q } = params;

  const filters = Object.keys(q);

  if (filters.includes("name")) {
    patientsFiltered = patientsFiltered.filter(
      (patient) => patient.name === params.q.name
    );
  }

  return patientsFiltered;
};
