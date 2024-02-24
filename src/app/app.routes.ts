import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { WeatherAppComponent } from './pages/weather-app';
import { CalendarAppComponent } from './pages/calendar-app';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'weather',
    component: WeatherAppComponent
  },
  {
    path: 'calendar',
    component: CalendarAppComponent
  }
];
