import { db } from "./firebase";
import { collection } from "firebase/firestore";

export const studentsCollection = collection(db, "students");
export const patientsCollection = collection(db, "patients");
