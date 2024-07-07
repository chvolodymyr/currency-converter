import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { CodeTuple, ICode, ICodeResponse, IExchangeRate, IExchangeRateResp } from '@core/interfaces';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  private httpClient = inject(HttpClient);

  public getCurrencyCodes(): Observable<ICode[]> {
    return this.httpClient.get<ICodeResponse>(`${environment.API_URL}/${environment.API_KEY}/codes`).pipe(
      map((resp: ICodeResponse) => resp.supported_codes),
      map((codes: CodeTuple[]) => codes.map(([code, country]) => ({ code, country }))),
      catchError(() => of([]))
    );
  }

  public getExchangeRate(base: string, target: string): Observable<IExchangeRate> {
    return this.httpClient.get<IExchangeRateResp>(`${environment.API_URL}/${environment.API_KEY}/pair/${base}/${target}`).pipe(
      map((res: IExchangeRateResp) => ({
        code: res.base_code,
        rate: res.conversion_rate,
      })),
      catchError(() => of({} as IExchangeRate))
    );
  }
}
