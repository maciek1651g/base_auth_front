import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-one-time-code-input',
    templateUrl: './one-time-code-input.component.html',
    styleUrls: ['./one-time-code-input.component.css'],
})
export class OneTimeCodeInputComponent {
    @Output() OTPVerified = new EventEmitter<boolean>();

    code: string = '';
    isLoadingButton = false;

    constructor(private httpService: HttpService, private messageService: MessageService) {}

    submitCode() {
        this.isLoadingButton = true;
        this.httpService.verifyOTP(this.code).subscribe({
            next: (response: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'OTP verified' });
                this.OTPVerified.emit(true);
                this.isLoadingButton = false;
                console.log(response);
            },
            error: (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `OTP verification failed. ${error.error}`,
                });
                this.OTPVerified.emit(false);
                this.isLoadingButton = false;
                console.log(error);
            },
        });
    }
}
