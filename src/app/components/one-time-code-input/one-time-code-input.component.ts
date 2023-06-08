import { Component } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-one-time-code-input',
  templateUrl: './one-time-code-input.component.html',
  styleUrls: ['./one-time-code-input.component.css'],
})
export class OneTimeCodeInputComponent {
  code: string = '';

  constructor(private httpService: HttpService) {}

  submitCode() {
    this.httpService.verifyOTP(this.code).subscribe((response: any) => {
      console.log(response);
    });
  }
}
