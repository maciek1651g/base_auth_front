import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.httpService.login(email, password).subscribe((response: any) => {
      console.log(response);
    });
  }
}
