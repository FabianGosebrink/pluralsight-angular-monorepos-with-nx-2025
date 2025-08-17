import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyBuildable } from '@dog-rate-app/my-buildable';
import { AuthStore } from '@dog-rate-app/shared/util-auth';

@Component({
  imports: [RouterModule, MyBuildable],
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
