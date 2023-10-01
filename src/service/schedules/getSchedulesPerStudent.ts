import { listSchedules } from ".";
import { Schedule, Student } from "..";
import { getStudent } from "../students";

export const getSchedulesPerStudent = async (studentId: string) => {
  try {
    const student = await getStudent(studentId);
    console.log(student);
    if (!student) return [];
    const schedules = (await listSchedules()) as Array<Schedule>;
    return schedules
      .filter((schedule) => schedule.student_id === studentId)
      .map((schedule) => ({ ...schedule, student }));
  } catch (error: any) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};
