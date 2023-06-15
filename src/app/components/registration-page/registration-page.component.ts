import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http/http.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent {
    @Output() loginButtonClicked = new EventEmitter<void>();

    minPasswordLength = 8;
    isLoadingButton = false;

    registrationForm: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(this.minPasswordLength)]],
    });

    constructor(
        private formBuilder: FormBuilder,
        private httpService: HttpService,
        private messageService: MessageService
    ) {}

    onSubmit() {
        if (this.registrationForm.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please enter a valid email and password',
            });
            return;
        }
        this.isLoadingButton = true;

        const { email, password } = this.registrationForm.value;
        this.httpService.register(email, password).subscribe({
            next: (response: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration successful' });
                this.loginButtonClicked.emit();
                this.isLoadingButton = false;
                console.log(response);
            },
            error: (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Registration failed. ${error.error}`,
                });
                this.isLoadingButton = false;
                console.log(error);
            },
        });
    }
}
