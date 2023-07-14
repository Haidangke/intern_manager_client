import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModules } from './project-routing.module';
import { ProjectListComponent } from './pages';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectFormComponent } from './components';

@NgModule({
    declarations: [ProjectListComponent, ProjectFormComponent],
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
    ],
})
export class ProjectModule {}
