export type Studant = {
  id: string;
  name: string;
  schedules_id: Array<Schedule.id>;
};

export type Schedule = {
  id: string;
  studant_id: Studant.id;
  pricePerTime: number;
  amoutTime: number;
  paid: boolean;
  date: Date | string;
};
