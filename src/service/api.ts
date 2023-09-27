import { FormCreateScheduling } from "@/src/components/domain/Scheduling";
import { Schedule, Student } from "./index.d";
import dayjs from "dayjs";

const mockedStudent: Student = {
  id: "1",
  name: "Fulano",
};

const mockedStudents: Array<Student> = [
  mockedStudent,
  { ...mockedStudent, name: "Sicrano" },
];

const mockedSchedules: Array<Schedule> = [];

export const listStudents = () => mockedStudents;

export const getStudent = (id: string) =>
  mockedStudents.find((student) => student.id === id);

export const getStudentByName = (name: string) =>
  mockedStudents.find((student) => student.name === name);

export const listSchedules = () => mockedSchedules;

export const getSchedule = (id: string) =>
  mockedSchedules.find((schedule) => schedule.id === id);

export const getSchedulesPerStudent = (id: string) =>
  mockedSchedules.filter((schedule) => schedule.student_id === id);

export const getStudentsPerSchedule = (id: string) =>
  mockedStudents.filter((student) => student.schedules_id?.includes(id));

export const createStudent = (student: Student) => {
  mockedStudents.push(student);
};

export const createScheduling = (schedule: FormCreateScheduling) => {
  const hasStudent = getStudentByName(schedule.name);

  if (hasStudent)
    return mockedSchedules.push({
      amountTime: schedule.amount,
      date: dayjs(schedule.date).toString(),
      id: String(mockedSchedules.length),
      paid: false,
      pricePerTime: schedule.price,
      student_id: hasStudent.id,
    });

  createStudent({ id: String(mockedStudents.length), name: schedule.name });

  return mockedSchedules.push({
    amountTime: schedule.amount,
    date: dayjs(schedule.date).toString(),
    id: String(mockedSchedules.length),
    paid: false,
    pricePerTime: schedule.price,
    student_id: mockedStudents[mockedStudents.length - 1].id,
  });
};
