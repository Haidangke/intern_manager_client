import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColListData } from '@shared/components/list-data/list-data.model';
import { PageInfo } from '@shared/model/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountDetail } from '../../models/account.model';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class AccountListComponent {
    constructor(
        private messageService: MessageService,
        private route: Router,
        private confirmationService: ConfirmationService,
        private accountService: AccountService
    ) {}
    ref!: DynamicDialogRef;
    accountList: AccountDetail[] = [];
    searchKeyword: string = '';
    isFetching = false;
    isDeleting = false;
    isDialog = false;
    totalRecords = 0;

    pagination: PageInfo = {
        size: 10,
        page: 0,
    };

    cols: ColListData[] = [
        {
            field: 'username',
        },
        {
            field: 'password',
            type: 'password',
        },
        {
            field: 'role',
        },
        {
            header: 'Linked User',
            field: 'intern.name',
        },
    ];

    ngOnInit() {
        this.fetchAccounts();
    }

    fetchAccounts() {
        this.isFetching = true;
        this.accountService.getAccounts().subscribe({
            next: (res) => {
                this.accountList = res.content.filter(
                    (account) => account.role !== 'ROLE_ADMIN'
                );
                this.isFetching = false;
            },
            error: (error) => {
                console.log(error);
                this.isFetching = false;
            },
        });
    }

    handlePageChange(event: any) {
        this.pagination.page = event.page;
        this.fetchAccounts();
    }

    handleSizeChange(event: any) {
        this.pagination.size = event.value;
        this.fetchAccounts();
    }

    handleSubmitSuccess() {
        this.fetchAccounts();
    }

    onAddAccountSuccess() {
        this.fetchAccounts();
        this.isDialog = false;
        this.messageService.add({
            severity: 'success',
            detail: 'Add account successfully',
        });
    }

    handleUpdateAccount(account: AccountDetail) {}

    handleDeleteAccount(id: string) {
        this.confirmationService.confirm({
            header: 'Delete Account',
            message: 'Are you sure that you want to delete this account ?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.isDeleting = true;
                this.accountService.deleteAccount(id).subscribe({
                    next: () => {
                        this.isDeleting = false;
                        this.fetchAccounts();
                        this.messageService.add({
                            severity: 'success',
                            detail: `Account has been deleted successfully!`,
                        });
                    },
                    error: () => {
                        this.isDeleting = false;
                        this.messageService.add({
                            severity: 'error',
                            detail: `Account could not be deleted!.`,
                        });
                    },
                });
            },
        });
    }
}
