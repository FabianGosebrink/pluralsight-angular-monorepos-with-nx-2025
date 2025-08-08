import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AddDogComponent } from './dogs/add-dog/add-dog.component';
import { DogDetailComponent } from './dogs/dog-detail/dog-detail.component';
import { MainDogComponent } from './dogs/main-dog/main-dog.component';
import { AboutComponent } from './about/about.component';
import { isAuthenticated } from './authentication/guards/auth.guard';
import { MyDogsComponent } from './dogs/my-dogs/my-dogs.component';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'dogs',
        component: MainDogComponent,
      },
      {
        path: 'dogs/my',
        canActivate: [isAuthenticated],
        component: MyDogsComponent,
      },
      {
        path: 'dogs/my/add',
        canActivate: [isAuthenticated],
        component: AddDogComponent,
      },
      {
        path: 'dogs/details/:dogId',
        component: DogDetailComponent,
        canActivate: [isAuthenticated],
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dogs',
      },
    ],
  },
];
