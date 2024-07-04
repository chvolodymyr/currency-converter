import { NgFor } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './currency-selector.component.html',
  styleUrl: './currency-selector.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CurrencySelectorComponent,
      multi: true,
    },
  ],
})
export class CurrencySelectorComponent implements ControlValueAccessor {
  public codes = input.required<{ code: string; country: string }[]>();

  onTouched: Function = () => {};
  onChangeSubs: Subscription[] = [];

  public form: FormGroup = inject(FormBuilder).group({
    amount: [0, [Validators.required, Validators.min(0)]],
    selectedCurrency: ['', [Validators.required]],
  });

  writeValue(obj: any): void {
    this.form.setValue(obj);
  }

  registerOnChange(onChange: any): void {
    const sub = this.form.valueChanges.subscribe(onChange);

    this.onChangeSubs.push(sub);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}
