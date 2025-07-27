import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { LoginResponse } from 'angular-auth-oidc-client';
import { tapResponse } from '@ngrx/operators';
import { UserProfile } from '../models/user-profile';
import { AuthService } from '../services/auth.service';

export interface AuthRootState {
  userProfile: UserProfile | null;
  isLoggedIn: boolean;
}

export const initialState: AuthRootState = {
  userProfile: null,
  isLoggedIn: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthRootState>(initialState),
  withComputed((store) => ({
    userEmail: computed(() => store.userProfile()?.email ?? ''),
    userSub: computed(() => store.userProfile()?.sub ?? ''),
  })),
  withMethods((store, authService = inject(AuthService)) => ({
    login() {
      authService.login();
    },

    logout: rxMethod<void>(
      switchMap(() => {
        return authService.logout().pipe(
          tapResponse({
            next: () => patchState(store, initialState),
            error: (err) => console.log(err),
          }),
        );
      }),
    ),

    checkAuth: rxMethod<string | null>(
      switchMap((url: string | null) => {
        return authService.checkAuth(url).pipe(
          tapResponse({
            next: (response: LoginResponse) =>
              patchState(store, {
                isLoggedIn: response.isAuthenticated,
                userProfile: response.userData,
              }),
            error: (err) => console.log(err),
          }),
        );
      }),
    ),
  })),
);
