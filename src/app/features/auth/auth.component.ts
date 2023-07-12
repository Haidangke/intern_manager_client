import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, IResponse } from './services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
    message = '';
    isRemembered = false;
    isLoading = false;

    formLogin!: FormGroup;

    constructor(
        private authService: AuthService,
        private cookieService: CookieService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.formLogin = this.fb.group({
            email: this.fb.control('', [Validators.required, Validators.email]),
            password: this.fb.control('', [
                Validators.required,
                Validators.minLength(6),
            ]),
            isRemember: this.fb.control(false),
        });
    }

    private loginSuccessHandle(res: IResponse) {
        this.isLoading = false;
        this.authService.user.next(res.name);

        const loginTime = this.formLogin.value.isRemember
            ? 3 * 24 * 60 * 60 * 1000
            : 60 * 60 * 1000;

        const expirationTime = new Date(new Date().getTime() + loginTime);
        this.cookieService.set('name', res.name);
        this.cookieService.set(
            'tokenExp',
            expirationTime.toISOString(),
            expirationTime
        );
        this.cookieService.set('token', res.access_token, expirationTime);
        this.router.navigate(['/']);
    }

    handleSubmit() {
        this.isLoading = true;
        const { email, password } = this.formLogin.value;
        this.authService.login(email, password).subscribe(
            (res) => {
                this.router.navigate(['']);
                this.loginSuccessHandle(res);
                this.authService.setLogoutAuto();
            },
            (error) => {
                this.formLogin.setErrors(error);
                this.isLoading = false;
                this.message = error;
            }
        );
    }
}
