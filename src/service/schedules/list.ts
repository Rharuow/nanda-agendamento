import { getDocs } from "firebase/firestore";
import { schedulesCollection } from "../collections";
import { Schedule } from "..";

export const listSchedules = async () => {
  try {
    return (await getDocs(schedulesCollection)).docs.map((schedule) => ({
      ...schedule.data(),
      id: schedule.id,
    })) as Array<Schedule>;
  } catch (error) {
    console.log("listSchedule = ", error);
    return false;
  }
};
