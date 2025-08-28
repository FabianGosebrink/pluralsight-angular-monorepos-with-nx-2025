import { inject, Injectable } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  login(): void {
    this.oidcSecurityService.authorize();
  }

  checkAuth(url: string | null): Observable<LoginResponse> {
    return this.oidcSecurityService.checkAuth(url ?? undefined);
  }

  logout(): Observable<unknown> {
    return this.oidcSecurityService.logoff();
  }
}
