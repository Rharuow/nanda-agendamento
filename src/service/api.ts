import { Schedule, Studant } from "./index.d";

const studants: Array<Studant> = [];

const schedules: Array<Schedule> = [];

export const listStudants = () => studants;

export const getStudant = (id: string) =>
  studants.find((studant) => studant.id === id);

export const listSchedules = () => schedules;

export const getSchedule = (id: string) =>
  schedules.find((schedule) => schedule.id === id);

export const getSchedulesPerStudant = (id: string) =>
  schedules.filter((schedule) => schedule.studant_id === id);

export const getStudantsPerSchedule = (id: string) =>
  studants.filter((studant) => studant.schedules_id.includes(id));
