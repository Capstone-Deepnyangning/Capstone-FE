interface Statics {
  endDate: string;
  globalAvg: number;
  startDate: string;
  weeklyAvg: number;
  weeklyStay: Array<{
    date: string;
    stayMinutes: number;
  }>;
}

interface MonthlyStatistics {
  month: number;
  year: number;
  monthlyStay: Array<{
    date: string;
    stayMinutes: number;
  }>;
  totalStay: number;
}

export type {Statics, MonthlyStatistics};
