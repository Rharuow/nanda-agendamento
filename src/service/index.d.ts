export type Student = {
  id: string;
  name: string;
  schedules_id?: Array<Schedule.id>;
};

export type Schedule = {
  id: string;
  Student_id: Student.id;
  pricePerTime: number;
  amoutTime: number;
  paid: boolean;
  date: Date | string;
};
