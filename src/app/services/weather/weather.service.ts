import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWeatherResponce } from './weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  API_KEY = '66fcb34fa0ed4b0798954731241302';

  getWeather(city: string): Observable<IWeatherResponce> {
    return this.http.get<IWeatherResponce>(
      `https://api.weatherapi.com/v1/current.json?key=${this.API_KEY}&q=${city}`
    );
  }
}
