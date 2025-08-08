import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from './authentication/state/auth.store';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly authStore = inject(AuthStore);

  ngOnInit(): void {
    this.authStore.checkAuth(null);
  }
}
