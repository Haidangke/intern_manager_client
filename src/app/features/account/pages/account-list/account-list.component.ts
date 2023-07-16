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
    providers: [ConfirmationService, DialogService, MessageService],
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
            field: 'linked_user',
            child: {
                field: '',
                url: [''],
            },
        },
    ];

    ngOnInit() {
        this.fetchAccounts();
    }

    fetchAccounts() {
        this.isFetching = true;
        this.accountService.getAccounts().subscribe({
            next: (res) => {
                this.accountList = res.content.map((account) => {
                    const linked_user = account.intern || account.mentor;
                    delete account.intern;
                    delete account.mentor;
                    return { ...account, linked_user };
                });
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

    handleUpdateAccount(account: AccountDetail) {}

    handleDeleteAccount(account: AccountDetail) {
        // const { id, name } = mentor;
        // this.confirmationService.confirm({
        //     header: 'Delete Mentor',
        //     message: 'Are you sure that you want to delete this mentor ?',
        //     icon: 'pi pi-exclamation-triangle',
        //     accept: () => {
        //         this.isDeleting = true;
        //         this.Accountservice.deleteMentor(id).subscribe({
        //             next: () => {
        //                 this.isDeleting = false;
        //                 this.mentorList = [...this.mentorList].filter(
        //                     (mentor) => mentor.id !== id
        //                 );
        //                 this.messageService.add({
        //                     severity: 'success',
        //                     detail: `Mentor ${name} has been deleted successfully!`,
        //                 });
        //             },
        //             error: (error) => {
        //                 this.isDeleting = false;
        //                 this.messageService.add({
        //                     severity: 'error',
        //                     detail: `Mentor ${name} could not be deleted!.`,
        //                 });
        //             },
        //         });
        //     },
        // });
    }
}
