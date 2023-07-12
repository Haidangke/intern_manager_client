import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassroomRoutingModules } from './project-routing.module';
import { ProjectListComponent } from './pages';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    declarations: [ ProjectListComponent],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        ClassroomRoutingModules,
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
export class ClassroomModule {}
