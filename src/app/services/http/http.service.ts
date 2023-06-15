import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { startRegistration, browserSupportsWebAuthn, startAuthentication } from '@simplewebauthn/browser';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private apiUrl = `${window.location.href}api`;
    private token: string | undefined;

    constructor(private http: HttpClient) {
        if (!browserSupportsWebAuthn()) {
            console.log('It seems this browser does not support WebAuthn...');
        }
    }

    get isLoggedIn(): boolean {
        return !!this.token;
    }

    login(email: string, password: string) {
        const loginData = { email, password };
        return this.http
            .post<string>(`${this.apiUrl}/login`, loginData, {
                responseType: 'text' as any,
            })
            .pipe(
                tap((response: string) => {
                    this.token = response;
                })
            );
    }

    register(email: string, password: string) {
        const registrationData = { email, password };
        return this.http.post(`${this.apiUrl}/register`, registrationData);
    }

    logout() {
        const userId = this.token;
        this.token = undefined;
        return this.http.post(`${this.apiUrl}/logout`, { userId });
    }

    registerOTP() {
        const userId = this.token;
        return this.http.post(`${this.apiUrl}/register2FA`, { userId });
    }

    verifyOTP(token: string) {
        const userId = this.token;
        return this.http.post(`${this.apiUrl}/verifyToken`, { userId, token });
    }

    registerU2FStart() {
        const userId = this.token;
        return new Observable((observer) => {
            this.http.post(`${this.apiUrl}/registerU2Fstart`, { userId }).subscribe((resp: any) => {
                console.log(resp);

                startRegistration(resp).then((attResp: any) => {
                    this.registerU2FEnd(attResp).subscribe((registrationResult) => {
                        observer.next(registrationResult); // Emituj wartość registrationResult
                        observer.complete(); // Zakończ obserwację
                    });
                });
            });
        });
    }

    private registerU2FEnd(attResp: any) {
        const userId = this.token;
        return this.http.post(`${this.apiUrl}/registerU2Fend`, {
            userId,
            attResp,
        });
    }

    verifyU2Start() {
        const userId = this.token;
        return new Observable((observer) => {
            this.http.post(`${this.apiUrl}/verifyU2Fstart`, { userId }).subscribe((resp: any) => {
                console.log(resp);

                startAuthentication(resp).then((authResp: any) => {
                    this.verifyU2End(authResp).subscribe((verificationResult) => {
                        observer.next(verificationResult); // Emituj wartość verificationResult
                        observer.complete(); // Zakończ obserwację
                    });
                });
            });
        });
    }

    private verifyU2End(authResp: any) {
        const userId = this.token;
        return this.http.post(`${this.apiUrl}/verifyU2Fend`, {
            userId,
            authResp,
        });
    }
}
