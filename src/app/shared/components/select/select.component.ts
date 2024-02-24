import { cities } from '@/data/favorites';
import { IWeatherData } from '@/models/weatherData';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Output() chooseFavorite = new EventEmitter<IWeatherData>();

  favorites = cities;
  selectedCity = new FormGroup({
    cityData: new FormControl('')
  });

  onSelect() {
    const cityData = cities.find(
      city => city.city === this.selectedCity.value.cityData
    );
    this.chooseFavorite.emit(cityData);
  }

  refreshSelect() {
    this.selectedCity.reset({ cityData: '' });
  }
}
