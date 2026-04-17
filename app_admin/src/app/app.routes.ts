import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: TripListingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];