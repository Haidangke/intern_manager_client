import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountListComponent } from './pages/account-list/account-list.component';
import { SharedModule } from '@shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@NgModule({
    declarations: [AccountListComponent, AccountFormComponent],
    imports: [
        AccountRoutingModule,
        SharedModule,
        ConfirmDialogModule,
        DialogModule,
        DropdownModule,
        ReactiveFormsModule,
        InputTextModule,
        TableModule
    ],
})
export class AccountModule {}
