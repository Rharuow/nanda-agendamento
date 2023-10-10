export type Student = {
  id?: string;
  name: string;
  schedules: Array<{
    pricePerTime: number;
    amountTime: number;
    paid: boolean;
    date: Date | string;
  } | null>;
};
