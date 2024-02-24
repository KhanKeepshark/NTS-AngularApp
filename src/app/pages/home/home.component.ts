import { ButtonComponent } from '@/shared/components';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ButtonComponent]
})
export class HomeComponent {
  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
