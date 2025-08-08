import { Route } from '@angular/router';
import { LayoutComponent } from '@dog-rate-app/shared/ui-common';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'about',
        loadChildren: () =>
          import('@dog-rate-app/about/container').then((m) => m.ABOUT_ROUTES),
      },
      {
        path: 'dogs',
        loadChildren: () =>
          import('@dog-rate-app/dogs/container').then((m) => m.DOGS_ROUTES),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dogs',
      },
    ],
  },
];
