import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CurrencyStateService } from '@core/services/currency-state.service';
import { HeaderComponent } from '@core/components/header/header.component';
import { CurrencySelectorComponent } from '@shared/components/currency-selector/currency-selector.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencySelectorComponent, HeaderComponent, MatIconModule, MatButtonModule, MatCardModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private curencyService = inject(CurrencyStateService);
  private route = inject(ActivatedRoute);

  public base = this.curencyService.getBase();
  public target = this.curencyService.getTarget();

  public codes = signal(this.route.snapshot.data['codes']);
  public headerData = signal<{ rate: number; code: string }[]>(this.route.snapshot.data['headerData']);

  public rate = this.curencyService.getRate();

  public ngOnInit(): void {
    this.curencyService.setNewRate(this.base().code, this.target().code, true);
  }

  public reverse() {
    const base = Object.freeze(this.base());
    this.curencyService.setBaseSignal({
      ...this.base(),
      code: this.target().code,
    });
    this.curencyService.setTargetSignal({ ...this.target(), code: base.code });
    this.onSelectedCodeChange(this.base().code, true);
  }

  public onAmountChange(amount: string, baseChanged: boolean) {
    this.curencyService.updateAmount(amount, baseChanged);
  }

  public onSelectedCodeChange(code: string, baseChanged: boolean) {
    this.curencyService.updateSelectedCodes(code, baseChanged);
  }
}
