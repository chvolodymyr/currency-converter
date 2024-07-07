import { ChangeDetectionStrategy, Component, inject, Injector, input, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ICode } from '@core/interfaces';

@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './currency-selector.component.html',
  styleUrl: './currency-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencySelectorComponent {
  public injector = inject(Injector);

  public amount = input.required<string>();
  public code = input.required<string>();

  public selectedCodeChange = output<string>();
  public amountChange = output<string>();

  public codes = input.required<ICode[]>();

  public onAmountChange(value: string) {
    this.amountChange.emit(value);
  }

  public onSelectChange(e: { value: string }) {
    this.selectedCodeChange.emit(e.value);
  }
}
