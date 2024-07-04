import { Component, inject, OnInit } from '@angular/core';
import { CurrencySelectorComponent } from '../shared/components/currency-selector/currency-selector.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CurrencySelectorComponent,
    HeaderComponent,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private fb = inject(FormBuilder);

  public converterFrom = this.fb.group({
    baseCurrency: [{ amount: 100, selectedCurrency: 'USD' }],
    targetCurrency: [{ amount: 0, selectedCurrency: 'UAH' }],
  });

  ngOnInit(): void {

  }

  reverse() {
    
  }

  convert() {

  }
}
