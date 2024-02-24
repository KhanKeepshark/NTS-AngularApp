import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons';
import { IWeatherData } from '@/models/weatherData';
import { WeatherService } from '@/services/weather/weather.service';
import { cities } from '@/data/favorites';
import { ButtonComponent, SelectComponent } from '@/shared/components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss'],
  imports: [
    ButtonComponent,
    FontAwesomeModule,
    SelectComponent,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class WeatherAppComponent implements OnInit {
  FaMagnifyingGlass = faMagnifyingGlass;
  FaStar = faStar;
  weatherData: IWeatherData | undefined;
  isFavorite = false;
  form = new FormGroup({
    cityName: new FormControl('')
  });
  @ViewChild(SelectComponent) select: SelectComponent | undefined;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.isFavorite = this.checkIfFavorite();
    });
  }

  submit() {
    const cityName = this.form.value.cityName ?? '';
    this.weatherService.getWeather(cityName).subscribe(data => {
      this.weatherData = {
        city: data.location.name,
        temperature: data.current.temp_c,
        imgUrl: data.current.condition.icon,
        wind: data.current.wind_kph,
        humidity: data.current.humidity
      };
      this.isFavorite = this.checkIfFavorite();
      this.select?.refreshSelect();
    });
  }

  addToFavorites() {
    if (!this.weatherData) return;
    const index = cities.findIndex(
      city => city.city === this.weatherData?.city
    );
    if (index !== -1) {
      cities.splice(index, 1);
      this.isFavorite = false;
      this.select?.refreshSelect();
    } else {
      cities.push(this.weatherData);
      this.isFavorite = true;
    }
  }

  chooseFavorite(cityData: IWeatherData) {
    this.weatherData = cityData;
    this.isFavorite = true;
  }

  private checkIfFavorite(): boolean {
    if (!this.weatherData) return false;
    return cities.some(city => city.city === this.weatherData?.city);
  }
}
