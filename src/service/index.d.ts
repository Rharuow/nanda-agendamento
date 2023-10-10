export type Student = {
  id?: string;
  name: string;
  totalTime: number;
  debitTotal: number;
  schedules: Array<{
    pricePerTime: number;
    amountTime: number;
    paid: boolean;
    date: Date | string;
  } | null>;
};
