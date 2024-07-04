import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';

type CodeTuple = [string, string];
type CodeResponse = { supported_codes: CodeTuple[] };
type Code = { code: string; country: string };

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private API_KEY = '133f4360f15e0092f573beb5';
  private API_URL = 'https://v6.exchangerate-api.com/v6/';

  private httpClient = inject(HttpClient);

  private currencySymbols = signal<Record<string, string>>({
    baseCurrency: '',
    targetCurrency: '',
  });

  public getCurrencyCodes(): Observable<Code[]> {
    return this.httpClient
      .get<CodeResponse>(`${this.API_URL}/${this.API_KEY}/codes`)
      .pipe(
        map((resp: CodeResponse) => resp.supported_codes),
        map((code: CodeTuple[]) =>
          code.map(([code, country]) => ({ code, country }))
        )
      );
  }

  // public getExchangeRate(
  //   baseCurrency: string,
  //   targetCurrency: string
  // ): Observable<any> {
  //   return this.httpClient.get(`${this.API_URL}/${this.API_KEY}/`);
  // }
}
