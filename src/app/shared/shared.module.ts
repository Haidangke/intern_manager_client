import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    LoadingSpinnerComponent,
    TabMenuComponent,
    ListDataComponent,
    ValidationErrorComponent,
    RenderColComponent
} from './components';

import { DropdownDirective } from './directives';
import { PascalCasePipe } from './pipes';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        PascalCasePipe,
        DropdownDirective,
        ListDataComponent,
        TabMenuComponent,
        ValidationErrorComponent,
        RenderColComponent,
        NotFoundPageComponent,
        AvatarComponent,
        ToastComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        SkeletonModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        DropdownModule,
        PaginatorModule,
        ConfirmDialogModule,
        RouterModule,
        TagModule,
        ToastModule,
    ],
    exports: [
        CommonModule,
        ToastModule,
        LoadingSpinnerComponent,
        DropdownDirective,
        FontAwesomeModule,
        PascalCasePipe,
        ListDataComponent,
        TabMenuComponent,
        ValidationErrorComponent,
        AvatarComponent,
        ToastComponent
    ],
})
export class SharedModule {}
