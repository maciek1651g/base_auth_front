import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent {
  minPasswordLength = 8;

  registrationForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(this.minPasswordLength)],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    const { email, password } = this.registrationForm.value;
    this.httpService.register(email, password).subscribe((response: any) => {
      console.log(response);
    });
  }
}
