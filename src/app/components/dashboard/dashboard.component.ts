import { Component } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  imageData: string | undefined;

  constructor(private httpService: HttpService) {}

  logout() {
    this.httpService.logout().subscribe((response: any) => {
      console.log(response);
    });
  }

  registerOTP() {
    this.httpService.registerOTP().subscribe((response: any) => {
      this.imageData = response.imageData;
      console.log(response);
    });
  }

  u2fRegistration() {
    this.httpService.registerU2FStart();
  }

  u2fVerification() {
    this.httpService.verifyU2Start();
  }
}
