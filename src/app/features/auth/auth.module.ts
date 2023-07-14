import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './auth.component';
@NgModule({
    declarations: [AuthComponent],

    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        FontAwesomeModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        ReactiveFormsModule,

        RouterModule.forChild([{ path: '', component: AuthComponent }]),
    ],
})
export class AuthModule {}
