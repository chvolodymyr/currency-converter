import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { combineLatest, of, tap } from 'rxjs';
import { CacheService } from '@core/services/cache.service';
import { CurrencyApiService } from '@core/services/currency-api.service';
import { HEADER_DATA_CACHE } from '@core/constants';

export const headerDataResolver: ResolveFn<unknown> = () => {
  const cacheService = inject(CacheService);
  const headerData = cacheService.loadCacheFromLocalStorage(HEADER_DATA_CACHE);

  return headerData
    ? of(headerData)
    : combineLatest([
        inject(CurrencyApiService).getExchangeRate('USD', 'UAH'),
        inject(CurrencyApiService).getExchangeRate('EUR', 'UAH'),
      ]).pipe(
        tap(res => {
          cacheService.saveCacheToLocalStorage(HEADER_DATA_CACHE, res);
        })
      );
};
