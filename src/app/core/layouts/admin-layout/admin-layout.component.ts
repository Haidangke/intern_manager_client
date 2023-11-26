import { Component } from '@angular/core';
import { AccountResponse } from '@features/account/models/account.model';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
    displaySidebar = false;
    account!: AccountResponse;
    ngOnInit() {
        const account = localStorage.getItem('account');
        if (account) {
            this.account = JSON.parse(account);
        }
    }
}
