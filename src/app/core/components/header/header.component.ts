import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CurrencyPipe } from '@angular/common';
import { IExchangeRate } from '@core/interfaces';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, CurrencyPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public rates = input.required<IExchangeRate[]>();
}
