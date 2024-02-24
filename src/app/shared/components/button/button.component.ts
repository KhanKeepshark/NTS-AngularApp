import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() buttonSize: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  private _danger?: boolean;

  @Input()
  set danger(value: boolean | undefined) {
    this._danger = value;
  }

  get danger(): boolean | undefined {
    return this._danger;
  }
}
