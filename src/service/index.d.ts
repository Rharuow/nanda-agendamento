export type Student = {
  id?: string;
  name: string;
  schedules_id?: Array<Schedule.id>;
};

export type Schedule = {
  id: string;
  student_id: Student.id;
  pricePerTime: number;
  amountTime: number;
  paid: boolean;
  date: Date | string;
};
