import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  logout() {
    // Implementacja logiki wylogowania
    console.log('Wylogowano');
  }

  generateOTP() {
    // Implementacja logiki generowania kodu jednorazowego
    console.log('Generowanie kodu jednorazowego');
  }

  u2fAuthentication() {
    // Implementacja logiki autoryzacji U2F
    console.log('Autoryzacja U2F');
  }
}
