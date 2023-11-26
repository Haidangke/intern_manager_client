import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    providers: [MessageService],
})
export class AuthComponent implements OnInit {
    message = '';
    isLoading = false;

    formLogin!: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.formLogin = this.fb.group({
            username: this.fb.control('admin', [Validators.required]),
            password: this.fb.control('123456', [
                Validators.required,
                Validators.minLength(6),
            ]),
            isRemember: this.fb.control(false),
        });
    }

    handleSubmit() {
        this.isLoading = true;
        const { username, password } = this.formLogin.value;
        this.authService.login(username, password).subscribe({
            next: (res) => {
                localStorage.setItem('access_token', res.accessToken);
                localStorage.setItem('account', JSON.stringify(res.account));
                this.router.navigate(['']);
            },
            error: (error) => {
                this.isLoading = false;
                this.messageService.add({
                    severity: 'error',
                    detail: 'Username or password incorrect',
                });
            },
        });
    }
}
