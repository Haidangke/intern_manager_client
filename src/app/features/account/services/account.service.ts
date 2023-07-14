import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageInfo, ResponsePagination } from '@shared/model/common';
import { AccountParams, AccountResponse } from '../models/account.model';
@Injectable({
    providedIn: 'root',
})
export class AccountService {
    constructor(private http: HttpClient) {}

    getListAccounts(
        pr: PageInfo = {
            page: 0,
            size: 10,
        }
    ) {
        return this.http.get<ResponsePagination<AccountResponse>>('accounts', {
            params: { ...pr },
        });
    }

    createAccount(account: AccountParams) {
        return this.http.post<AccountResponse>('accounts', account);
    }

    updateAccount(id: string, account: AccountParams) {
        return this.http.post<AccountResponse>('accounts' + id, account);
    }

    deleteAccount(id: string) {
        return this.http.delete('accounts' + id);
    }
}
