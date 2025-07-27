import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { APP_ROUTES } from './app.routes';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  authInterceptor,
  provideAuth,
  StsConfigLoader,
  StsConfigStaticLoader,
} from 'angular-auth-oidc-client';
import { provideToastr } from 'ngx-toastr';
import { environment } from '../environments/environment';

const authFactory = (): StsConfigStaticLoader => {
  const config = {
    authority: 'https://dev-2fwvrhka.us.auth0.com',
    redirectUrl: `${window.location.origin}`,
    clientId: 'W6a2DDLMzlWPF6vZ5AKKNnFVonklSU0m',
    scope: 'openid profile email offline_access access:api',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    postLogoutRedirectUri: `${window.location.origin}`,
    customParamsAuthRequest: {
      audience: environment.server,
    },
    secureRoutes: [environment.server],
  };

  return new StsConfigStaticLoader(config);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor()])),
    provideAuth({
      loader: {
        provide: StsConfigLoader,
        useFactory: authFactory,
      },
    }),
    provideToastr({
      positionClass: 'toast-bottom-right',
    }),
  ],
};
