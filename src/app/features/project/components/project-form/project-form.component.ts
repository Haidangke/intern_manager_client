import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    providers: [DialogService, ConfirmationService],
})
export class ProjectFormComponent {
    constructor() {}
}
