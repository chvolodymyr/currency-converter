import { inject, Injectable, Signal, signal } from '@angular/core';
import { map, take } from 'rxjs';
import { CacheService } from '@core/services/cache.service';
import { CurrencyApiService } from '@core/services/currency-api.service';
import { RATE_CACHE_KEY } from '@core/constants';
import { ICurrency } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CurrencyStateService {
  private api = inject(CurrencyApiService);
  private cacheService = inject(CacheService);
  public baseSignal = signal({ amount: '100', code: 'USD' });
  public targetSignal = signal({ amount: '0', code: 'UAH' });

  public rateSignal = signal(0);

  public headerState = signal([]);

  private rateCache = new Map<string, number>();

  constructor() {
    this.rateCache = this.cacheService.localStorageDataToMap(RATE_CACHE_KEY, this.cacheService.loadCacheFromLocalStorage(RATE_CACHE_KEY));
  }

  public getHeaderCurrency() {
    return this.headerState;
  }

  public setHeaderCurrency(value: any) {
    return this.headerState.set(value);
  }

  public setBaseSignal(value: ICurrency) {
    this.baseSignal.set(value);
  }

  public setTargetSignal(value: ICurrency) {
    this.targetSignal.set(value);
  }

  public getBase(): Signal<ICurrency> {
    return this.baseSignal;
  }

  public getTarget(): Signal<ICurrency> {
    return this.targetSignal;
  }
  public getRate(): Signal<number> {
    return this.rateSignal;
  }

  public setNewRate(baseCode: string, targetCode: string, isBaseChanged = true) {
    const cacheKey = `${baseCode}_${targetCode}`;

    if (this.rateCache.has(cacheKey)) {
      this.rateSignal.set(this.rateCache.get(cacheKey) as number);
      this.updateAmount(this.baseSignal().amount, isBaseChanged);
      return;
    }

    this.api
      .getExchangeRate(baseCode, targetCode)
      .pipe(
        map(res => {
          this.rateCache.set(cacheKey, res.rate);
          this.cacheService.saveMapToLocalStorage(RATE_CACHE_KEY, this.rateCache);
          this.rateSignal.set(res.rate);
          if (!isBaseChanged) this.updateAmount(this.baseSignal().amount, !isBaseChanged);
          else this.updateAmount(this.baseSignal().amount, isBaseChanged);
        }),
        take(1)
      )
      .subscribe();
  }

  public updateSelectedCodes(code: string, baseChanged: boolean) {
    if (!!this.baseSignal().code && !!this.targetSignal().code) {
      if ((!baseChanged && code === this.baseSignal().code) || (baseChanged && code === this.targetSignal().code)) {
        this.rateSignal.set(1);
        if (baseChanged) this.setTargetSignal({ ...this.baseSignal(), code });
        else this.setBaseSignal({ ...this.targetSignal(), code });

        this.updateCode(code, baseChanged);
        return;
      }

      this.updateCode(code, baseChanged);

      this.setNewRate(this.baseSignal().code, this.targetSignal().code, baseChanged);
    }
  }
  public updateCode(code: string, baseChanged: boolean) {
    if (baseChanged) {
      this.setBaseSignal({
        ...this.baseSignal(),
        code,
      });
    } else {
      this.setTargetSignal({
        ...this.targetSignal(),
        code,
      });
    }
  }

  public updateAmount(amount: string, baseChanged: boolean) {
    if (!!this.baseSignal().code && !!this.targetSignal().code) {
      this.setTargetSignal({
        ...this.targetSignal(),
        amount: baseChanged ? (+amount * this.rateSignal()).toFixed(2) : amount,
      });

      this.setBaseSignal({
        ...this.baseSignal(),
        amount: baseChanged ? amount : (+amount / this.rateSignal()).toFixed(2),
      });
    }
  }
}
