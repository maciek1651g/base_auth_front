import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http/http.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
    @Output() registerButtonClicked = new EventEmitter<void>();

    isLoadingButton = false;

    loginForm: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    });

    constructor(
        private formBuilder: FormBuilder,
        private httpService: HttpService,
        private messageService: MessageService
    ) {}

    onSubmit() {
        if (this.loginForm.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fill in all the required fields',
            });
            return;
        }
        this.isLoadingButton = true;

        const { email, password } = this.loginForm.value;
        this.httpService.login(email, password).subscribe({
            next: (response: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
                this.isLoadingButton = false;
                console.log(response);
            },
            error: (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Login failed. ${error.error}`,
                });
                this.isLoadingButton = false;
                console.log(error);
            },
        });
    }
}
