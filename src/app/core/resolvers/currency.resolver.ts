import { ResolveFn } from '@angular/router';
import { CurrencyApiService } from '../services/currency-api.service';
import { inject } from '@angular/core';
import { of, tap } from 'rxjs';
import { CacheService } from '@core/services/cache.service';
import { CODE_CACHE_KEY } from '@core/constants';

export const currencyResolver: ResolveFn<unknown> = () => {
  const cacheService = inject(CacheService);
  const cachedCodes = cacheService.loadCacheFromLocalStorage(CODE_CACHE_KEY);
  return cachedCodes
    ? of(cachedCodes)
    : inject(CurrencyApiService)
        .getCurrencyCodes()
        .pipe(tap(res => cacheService.saveCacheToLocalStorage(CODE_CACHE_KEY, res)));
};
