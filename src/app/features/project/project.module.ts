import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabMenuModule } from 'primeng/tabmenu';
import { ProjectDetailComponent, ProjectListComponent } from './pages';
import { ProjectRoutingModules } from './project-routing.module';
import { TableModule } from 'primeng/table';

@NgModule({
    declarations: [
        ProjectListComponent,
        ProjectDetailComponent,
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        ProjectRoutingModules,
        FormsModule,
        DropdownModule,
        TabMenuModule,
        ButtonModule,
        DynamicDialogModule,
        ConfirmDialogModule,
        InputTextModule,
        DropdownModule,
        DialogModule,
        MultiSelectModule,
        TableModule
    ],
})
export class ProjectModule {}
