import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Request } from '@shared/model/request';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface IResponse {
    access_token: string;
    token_type: string;
    name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<string>('');
    timer!: any;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router,
        public jwtHelper: JwtHelperService
    ) {}

    login(email: string, password: string) {
        const request = new Request();
        request.addBodyParams('username', email);
        request.addBodyParams('password', password);

        return this.http
            .post<IResponse>(
                'https://qlsv-mu.vercel.app/api/token',
                request.getBody(),
                { headers: request.headers }
            )
            .pipe(catchError(this.handlerError));
    }

    private handlerError(error: HttpErrorResponse) {
        return throwError(error.error.detail);
    }

    isAuthenticated(): boolean {
        const token = this.cookieService.get('token');
        return !this.jwtHelper.isTokenExpired(token);
    }

    resetAuth() {
        this.user.next('');
        this.cookieService.deleteAll('/');
        this.router.navigate(['auth']);
        clearTimeout(this.timer);
    }

    setLogoutAuto() {
        const jwtToken = this.cookieService.get('token');
        const jwtTokenExpiration = this.cookieService.get('tokenExp');

        if (jwtToken && jwtTokenExpiration) {
            const expirationTime = new Date(jwtTokenExpiration);
            this.timer = setInterval(() => {
                if (new Date() > expirationTime) {
                    this.resetAuth();
                }
            }, 1000);
        } else {
            this.resetAuth();
        }
    }
}
