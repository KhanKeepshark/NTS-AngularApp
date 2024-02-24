export interface IDateData {
  currentDate: Date;
  currentMonth: number;
  currentYear: number;
  monthDaysNumber: number;
  monthDays: (number | undefined)[];
  firstDay: number;
}
