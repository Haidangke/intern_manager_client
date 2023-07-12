import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbComponent,
} from './components';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AdminLayoutComponent } from './layouts';
import { ToastModule } from 'primeng/toast';
@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        BreadcrumbComponent,
        AdminLayoutComponent,
    ],
    imports: [
        CommonModule,
        SidebarModule,
        RouterModule,
        FontAwesomeModule,
        InputTextModule,
        ButtonModule,
        AvatarModule,
        FormsModule,
        BreadcrumbModule,
        ToastModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        BreadcrumbComponent,
    ],
})
export class CoreModule {}
