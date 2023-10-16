import { Patient, Schedule } from "../..";
import dayjs from "dayjs";
import { FilterType } from "./types";
import { listPatients } from "../list";

export const listSchedules = async (filter?: FilterType) => {
  try {
    const patients = await listPatients();
    const schedules = patients
      .map((patient) =>
        patient.schedules && patient.schedules.length > 0
          ? patient.schedules.map((schedule, index) => ({
              ...schedule,
              patient,
              position: index,
            }))
          : []
      )
      .flat();
    return filter && schedules && schedules.length > 0
      ? filterSchedules({
          filter,
          schedules: schedules as Array<
            Schedule & { patient: Patient; position: number }
          >,
        })
      : schedules;
  } catch (error: any) {
    console.log("listPatients = ", error);
    throw new Error(`${error.message}`);
  }
};

export const filterSchedules = ({
  filter,
  schedules,
}: {
  filter: FilterType;
  schedules: Array<Schedule & { patient: Patient; position: number }>;
}) => {
  const { q } = filter;
  const params = Object.keys(q);
  let schedulesFiltred = schedules;
  schedulesFiltred = params.some((param) => param === "patientName")
    ? schedulesFiltred.filter(
        (schedule) => schedule.patient.name === q.patientName
      )
    : schedulesFiltred;

  schedulesFiltred = params.some((param) => param === "startOfNow")
    ? schedulesFiltred.filter((schedule) =>
        dayjs(schedule.date).isAfter(dayjs().subtract(1, "day"))
      )
    : schedulesFiltred;

  schedulesFiltred = params.some((param) => param === "startOfDate")
    ? schedulesFiltred.filter((schedule) =>
        dayjs(schedule.date).isAfter(dayjs(q.startOfDate).subtract(1, "day"))
      )
    : schedulesFiltred;

  schedulesFiltred = params.some((param) => param === "endOfDate")
    ? schedulesFiltred.filter((schedule) =>
        dayjs(schedule.date).isBefore(dayjs(q.endOfDate).add(1, "day"))
      )
    : schedulesFiltred;

  schedulesFiltred = params.some((param) => param === "paid")
    ? schedulesFiltred.filter((schedule) => schedule.paid === q.paid)
    : schedulesFiltred;

  return schedulesFiltred;
};
