import { IDateData } from '@/models/dateData';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isVisible$ = new BehaviorSubject<boolean>(false);
  itemDate: Date = new Date();

  open(date: IDateData, day: number) {
    this.isVisible$.next(true);
    this.itemDate = new Date(date.currentYear, date.currentMonth, day);
  }

  close() {
    this.isVisible$.next(false);
  }
}
