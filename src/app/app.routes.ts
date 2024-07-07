import { Routes } from '@angular/router';
import { currencyResolver } from './core/resolvers/currency.resolver';
import { headerDataResolver } from './core/resolvers/header.resolver';

export const routes: Routes = [
  {
    path: '',
    resolve: { codes: currencyResolver, headerData: headerDataResolver },
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
