import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { StudentRoutingModule } from './intern-routing.module';
import { SharedModule } from '@shared/shared.module';

import { InternFormComponent, InternReportComponent } from './components';
import { StudentDetailComponent, InternListComponent } from './pages';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { InfoInternComponent } from './components/info-intern/info-intern.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { EditorModule } from 'primeng/editor';
@NgModule({
    declarations: [
        InternListComponent,
        InternFormComponent,
        StudentDetailComponent,
        InfoInternComponent,
        InternReportComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        StudentRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        SkeletonModule,
        PaginatorModule,
        FormsModule,
        ConfirmDialogModule,
        TabMenuModule,
        DropdownModule,
        CalendarModule,
        DynamicDialogModule,
        FullCalendarModule,
        DialogModule,
        DividerModule,
        EditorModule,
    ],
})
export class StudentModule {}
