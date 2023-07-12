import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Mentor } from 'app/features/mentor/models/mentor.model';
import { MentorService } from 'app/features/mentor/services/mentor.service';
import { InternDetail } from '../../models/intern.model';
import { InternService } from '../../services/intern.service';
import { GENDER_DROPDOWN } from '@shared/constants';
import { STATUS_INTERN_DROPDOWN } from '@shared/constants/status-intern';
import { MessageService } from 'primeng/api';
import { Team } from '@features/team/models/team.model';
import { TeamService } from '@features/team/services/team.service';

@Component({
    selector: 'app-intern-form',
    templateUrl: './intern-form.component.html',
    styleUrls: ['./intern-form.component.scss'],
    providers: [MessageService],
})
export class InternFormComponent {
    genders = GENDER_DROPDOWN;
    status = STATUS_INTERN_DROPDOWN;

    internForm!: FormGroup;
    isLoading = false;
    mentorList!: Mentor[];
    teamList!: Team[];

    @Input() intern!: InternDetail;
    @Input() isDialog = false;
    @Output() onSubmitSuccess = new EventEmitter<InternDetail>();

    constructor(
        private internService: InternService,
        private mentorService: MentorService,
        private teamService: TeamService,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        // Init create student form group
        this.internForm = this.fb.group({
            name: this.fb.control(null, {
                validators: [Validators.required],
            }),
            gender: this.fb.control('male', [Validators.required]),
            birthday: this.fb.control(null, [Validators.required]),
            address: this.fb.control(null, [Validators.required]),
            phone: this.fb.control(null, [
                Validators.required,
                Validators.pattern('[- +()0-9]+'),
            ]),
            email: this.fb.control(null, [
                Validators.required,
                Validators.email,
            ]),
            status: this.fb.control(null),
            team: this.fb.control(null, [Validators.required]),
            mentor: this.fb.control(null, [Validators.required]),
            technology: this.fb.control(null, [Validators.required]),
            description: this.fb.control(null, [Validators.required]),
        });

        // Get class list
        this.mentorService.getMentors().subscribe({
            next: (response) => {
                this.mentorList = response.content;
            },
        });

        this.teamService.getList().subscribe({
            next: (response) => {
                this.teamList = response.content;
            },
        });

        // Handle for update mode
        if (this.intern) {
            const {
                name,
                email,
                gender,
                address,
                phone,
                birthday,
                status,
                description,
                mentor,
                technology,
                team,
            } = this.intern;

            this.internForm.setValue({
                name,
                email,
                gender,
                address,
                phone,
                birthday,
                status,
                description,
                mentor: mentor.id,
                technology,
                team: team.id,
            });
        }
    }

    handleSubmit() {
        this.internForm.disable();
        this.isLoading = true;

        if (this.intern) {
            this.internService
                .updateIntern(this.intern.id, this.internForm.value)
                .subscribe({
                    next: (response) => {
                        this.isLoading = false;
                        this.messageService.add({
                            severity: 'success',
                            detail: 'Update intern successfully',
                        });
                        this.onSubmitSuccess.emit(response);
                    },
                    error: () => {
                        this.isLoading = false;
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Update intern failure',
                        });
                    },
                });
        } else {
            this.internService.createIntern(this.internForm.value).subscribe({
                next: (response) => {
                    this.onSubmitSuccess.emit(response);
                    this.internForm.reset();
                    this.isLoading = false;
                    this.messageService.add({
                        severity: 'success',
                        detail: 'Create intern successfully',
                    });
                },
                error: () => {
                    this.isLoading = false;
                    this.messageService.add({
                        severity: 'error',
                        detail: 'Update intern failure',
                    });
                },
            });
        }
    }
}
