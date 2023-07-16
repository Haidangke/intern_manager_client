import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    providers: [DialogService, ConfirmationService],
})
export class ProjectFormComponent implements OnInit {
    projectForm!: FormGroup;
    constructor(private fb: FormBuilder) {}
    ngOnInit(): void {
        this.projectForm = this.fb.group({
            name: this.fb.control(''),
        });
    }
    handleSubmit() {}
}
