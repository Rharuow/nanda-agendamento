import { useSchedules } from "@/src/service/hooks/useSchedules";
import { Empty } from "./Empty";
import { List } from "./List";
import { useStudents } from "@/src/service/hooks/useStudents";
import { Loading } from "../../Loading";

export const ListScheduling = () => {
  const { data: schedules, isLoading: schedulesIsLoading } = useSchedules();

  const { data: students, isLoading: studentsIsLoading } = useStudents();

  return students && schedules && schedules.length > 0 ? (
    <List
      schedules={schedules.map((schedule) => ({
        ...schedule,
        student: students?.find(
          (student) => student.id === schedule.student_id
        ),
      }))}
    />
  ) : schedulesIsLoading || studentsIsLoading ? (
    <Loading />
  ) : (
    <Empty />
  );
};
