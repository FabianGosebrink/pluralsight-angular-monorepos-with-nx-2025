import { Routes } from '@angular/router';
import { MainDogComponent } from './main-dog/main-dog.component';
import { MyDogsComponent } from './my-dogs/my-dogs.component';
import { AddDogComponent } from './add-dog/add-dog.component';
import { isAuthenticated } from '@dog-rate-app/shared/util-auth';
import { DogDetailComponent } from './dog-detail/dog-detail.component';

export const DOGS_ROUTES: Routes = [
  {
    path: '',
    component: MainDogComponent,
  },
  {
    path: 'my',
    canActivate: [isAuthenticated],
    component: MyDogsComponent,
  },
  {
    path: 'my/add',
    canActivate: [isAuthenticated],
    component: AddDogComponent,
  },
  {
    path: 'details/:dogId',
    component: DogDetailComponent,
    canActivate: [isAuthenticated],
  },
];
