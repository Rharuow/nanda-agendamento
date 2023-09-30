import dayjs from "dayjs";

import { FormCreateScheduling } from "@/src/components/domain/Scheduling";
import { Schedule, Student } from "./index.d";

export {
  createStudent,
  getStudent,
  listStudents,
  getStudentByName,
  getStudentsPerSchedule,
} from "./students";

export {
  listSchedules,
  getSchedule,
  createScheduling,
  getSchedulesPerStudent,
} from "./schedules";
