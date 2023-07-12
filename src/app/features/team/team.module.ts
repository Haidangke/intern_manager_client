import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TeamListComponent, TeamDetailComponent } from './pages';
import { TeamRoutingModule } from './team-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [TeamListComponent, TeamFormComponent, TeamDetailComponent],
    imports: [
        CommonModule,
        TeamRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        ConfirmDialogModule,
        DialogModule,
        InputTextModule,
        DropdownModule,
        RouterModule,
    ],
})
export class TeamModule {}
