export type Student = {
  id?: string;
  name: string;
  totalTime: number;
  debitTotal: number;
  schedules: Array<Schedule | null>;
};

export type Patient = {
  id?: string;
  name: string;
  totalTime: number;
  debitTotal: number;
  schedules: Array<Schedule | null>;
};

export type Schedule = {
  pricePerTime: number;
  amountTime: number;
  paid: boolean;
  date: Date | string;
};
