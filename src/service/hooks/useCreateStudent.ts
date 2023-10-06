import { useMutation } from "@tanstack/react-query";
import { createStudent } from "../students";
import { Student } from "..";

export const useCreateStudent = () =>
  useMutation({
    mutationFn: (student: Student) => createStudent(student),
  });
