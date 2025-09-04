import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { AuthStore } from '@dog-rate-app/shared/util-auth';
import { environment } from '@dog-rate-app/shared/util-environments';
import { RealTimeStore } from '@dog-rate-app/shared/util-real-time';

@Component({
  selector: 'lib-layout',
  imports: [RouterModule, FooterComponent, NavigationComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  realTimeStore = inject(RealTimeStore);
  authStore = inject(AuthStore);

  backendUrl = environment.server;

  login(): void {
    this.authStore.login();
  }

  logout(): void {
    this.authStore.logout();
  }
}
