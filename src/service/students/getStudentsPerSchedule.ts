import { listStudents } from ".";
import { Student } from "..";
import { getSchedule } from "../schedules";

export const getStudentsPerSchedule = async (scheduleId: string) => {
  try {
    const schedule = await getSchedule(scheduleId);
    const students = (await listStudents()) as Array<Student>;

    return students
      .filter((student) => student.schedules_id?.includes(schedule.id))
      .map((student) => ({ ...student, schedule }));
  } catch (error: any) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};
