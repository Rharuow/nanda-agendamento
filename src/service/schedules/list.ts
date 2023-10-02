import { getDocs } from "firebase/firestore";
import { schedulesCollection } from "../collections";
import { Schedule } from "..";
import dayjs from "dayjs";

export const listSchedules = async () => {
  try {
    return (
      (await getDocs(schedulesCollection)).docs.map((schedule) => ({
        ...schedule.data(),
        id: schedule.id,
      })) as Array<Schedule>
    ).sort((current, next) => {
      return dayjs(current.date).isBefore(dayjs(next.date)) ? 0 : -1;
    });
  } catch (error) {
    console.log("listSchedule = ", error);
    return false;
  }
};
