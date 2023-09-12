import { Schedule, Student } from "./index.d";

const mockedStudent: Student = {
  id: "1",
  name: "Fulano",
};

const Students: Array<Student> = [
  mockedStudent,
  { ...mockedStudent, name: "Sicrano" },
];

const schedules: Array<Schedule> = [];

export const listStudents = () => Students;

export const getStudent = (id: string) =>
  Students.find((Student) => Student.id === id);

export const listSchedules = () => schedules;

export const getSchedule = (id: string) =>
  schedules.find((schedule) => schedule.id === id);

export const getSchedulesPerStudent = (id: string) =>
  schedules.filter((schedule) => schedule.Student_id === id);

export const getStudentsPerSchedule = (id: string) =>
  Students.filter((Student) => Student.schedules_id?.includes(id));
