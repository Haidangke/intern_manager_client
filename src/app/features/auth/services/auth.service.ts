import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountResponse } from '@features/account/models/account.model';

export interface IResponse {
    accessToken: string;
    account: AccountResponse;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}

    login(username: string, password: string) {
        const data = {
            username,
            password,
        };
        return this.http.post<IResponse>('auth/authenticate', data);
    }
}
