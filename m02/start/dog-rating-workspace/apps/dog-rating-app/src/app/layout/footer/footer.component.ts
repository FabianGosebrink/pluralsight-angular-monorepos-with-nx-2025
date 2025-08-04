import { Component, input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  userEmail = input('');
  backendUrl = input('');
  realTimeConnection = input('');

  currentYear = new Date().getFullYear();
}
