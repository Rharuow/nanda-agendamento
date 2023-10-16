import { useMutation } from "@tanstack/react-query";
import { Patient } from "../..";
import { createPatient } from "../../patients/create";

export const useCreatePatient = () =>
  useMutation({
    mutationFn: (patientData: Patient) => createPatient(patientData),
  });
