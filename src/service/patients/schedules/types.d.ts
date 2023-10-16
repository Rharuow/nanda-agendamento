export type FilterType = {
  q: {
    patientName?: string;
    startOfDate?: string;
    endOfDate?: string;
    paid?: boolean;
    startOfNow?: boolean;
  };
};
