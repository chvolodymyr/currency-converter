import { Injectable } from '@angular/core';
import { STORAGE_DATE_KEY } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {
    this.invalidateLocalStorageDaily();
  }

  public saveCacheToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public loadCacheFromLocalStorage(key: string): any {
    const cachedData = localStorage.getItem(key);

    return JSON.parse(cachedData as string);
  }

  public saveMapToLocalStorage(key: string, map: Map<string, any>): void {
    localStorage.setItem(key, JSON.stringify(Array.from(map.entries())));
  }

  public localStorageDataToMap(key: string, parsedData: any): Map<string, any> {
    const cachedData = localStorage.getItem(key);
    const cacheMap = new Map<string, any>();
    if (cachedData) {
      if (Array.isArray(parsedData)) {
        parsedData.forEach(([k, data]) => {
          cacheMap.set(k, data);
        });
      }
    }

    return cacheMap;
  }

  private invalidateLocalStorageDaily(): void {
    const currentDate = this.getCurrentDate();
    const lastCheckedDate = localStorage.getItem(STORAGE_DATE_KEY);

    if (lastCheckedDate && lastCheckedDate !== currentDate) {
      localStorage.clear();
      localStorage.setItem(STORAGE_DATE_KEY, currentDate);
    }
  }

  private getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
