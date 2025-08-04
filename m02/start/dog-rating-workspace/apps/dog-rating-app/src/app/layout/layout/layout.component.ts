import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { AuthStore } from '../../authentication/state/auth.store';
import { environment } from '../../../environments/environment';
import { RealTimeStore } from '../../real-time/store/real-time.store';

@Component({
  selector: 'app-layout',
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
