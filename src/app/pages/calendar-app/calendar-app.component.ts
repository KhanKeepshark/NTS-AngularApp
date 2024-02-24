import { todosData } from '@/data/todos';
import { IDateData } from '@/models/dateData';
import { MonthPipePipe } from '@/pipe/calendar';
import { ModalService } from '@/services/modal';
import { ModalComponent } from '@/shared/components';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendar-app',
  standalone: true,
  imports: [CommonModule, MonthPipePipe, FontAwesomeModule, ModalComponent],
  providers: [ModalService],
  templateUrl: './calendar-app.component.html',
  styleUrl: './calendar-app.component.scss'
})
export class CalendarAppComponent {
  FaChevronLeft = faChevronLeft;
  FaChevronRight = faChevronRight;
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  currentDate: IDateData = this.getMonthInfo(new Date());

  constructor(public modalService: ModalService) {}

  changeMonth(direction: number): void {
    this.currentDate = this.getMonthInfo(
      new Date(
        this.currentDate.currentYear,
        this.currentDate.currentMonth + direction,
        1
      )
    );
  }

  checkToday(day: number | undefined): string {
    const dayInfo = new Date(
      this.currentDate.currentYear,
      this.currentDate.currentMonth,
      day
    ).toDateString();
    const today = new Date().toDateString();
    if (todosData[dayInfo]) {
      return 'has-todos';
    }
    if (dayInfo === today) {
      return 'today';
    }
    return '';
  }

  getMonthInfo(currentDate: Date): IDateData {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const monthDaysNumber = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    const monthDays: (number | undefined)[] = Array.from(
      { length: monthDaysNumber },
      (v, k) => k + 1
    );
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    for (let i = 1; i < (firstDay || 7); i++) {
      monthDays.unshift(undefined);
    }
    return {
      currentDate,
      currentMonth,
      currentYear,
      monthDaysNumber,
      monthDays,
      firstDay
    };
  }
}
