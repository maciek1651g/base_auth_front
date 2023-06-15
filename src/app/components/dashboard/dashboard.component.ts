import { Component } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
    imageData: string | undefined;
    isOtpEnabled = false;
    checkOtp = false;
    isU2FEnabled = false;

    isU2FLoading = false;

    constructor(private httpService: HttpService, private messageService: MessageService) {}

    logout() {
        this.httpService.logout().subscribe((response: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged out' });
            console.log(response);
        });
    }

    registerOTP() {
        this.httpService.registerOTP().subscribe({
            next: (response: any) => {
                this.imageData = response.imageData;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'OTP registered' });
                console.log(response);
            },
            error: (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `OTP registration failed. ${error.error}`,
                });
                console.log(error);
            },
        });
    }

    OtpVerified(verified: boolean) {
        if (verified) {
            this.isOtpEnabled = true;
            this.imageData = undefined;
        }
    }

    u2fRegistration() {
        this.isU2FLoading = true;
        this.httpService.registerU2FStart().subscribe({
            next: (response: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'U2F registered' });
                this.isU2FEnabled = true;
                this.isU2FLoading = false;
                console.log(response);
            },
            error: (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `U2F registration failed. ${error.error}`,
                });
                this.isU2FLoading = false;
                console.log(error);
            },
        });
    }

    u2fVerification() {
        this.isU2FLoading = true;
        this.httpService.verifyU2Start().subscribe({
            next: (response: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'U2F verified' });
                this.isU2FLoading = false;
                console.log(response);
            },
            error: (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `U2F verification failed. ${error.error}`,
                });
                this.isU2FLoading = false;
                console.log(error);
            },
        });
    }
}
