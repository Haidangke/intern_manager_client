import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MentorDetail } from '@features/mentor/models/mentor.model';
import { MentorService } from '@features/mentor/services/mentor.service';
import { TeamDetail } from '@features/team/models/team.model';
import { TeamService } from '@features/team/services/team.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-team-form',
    templateUrl: './team-form.component.html',
    styleUrls: ['./team-form.component.scss'],
})
export class TeamFormComponent implements OnInit {
    @Input() team?: TeamDetail;
    @Output() onSubmitSuccess = new EventEmitter<TeamDetail>();
    listMentor!: MentorDetail[];
    teamForm!: FormGroup;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private mentorService: MentorService,
        private teamService: TeamService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.teamForm = this.fb.group({
            name: this.fb.control('', [Validators.required]),
            mentor: this.fb.control(null, [Validators.required]),
        });

        this.mentorService.getMentors().subscribe({
            next: (response) => {
                this.listMentor = response.content;
            },
        });
    }

    handleSubmit() {
        this.isLoading = true;
        this.teamForm.disable();

        this.teamService.createTeam(this.teamForm.value).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.teamForm.reset();
            
                this.onSubmitSuccess.emit(response);
                this.messageService.add({
                    severity: 'success',
                    detail: 'Add team successfully',
                });
            },
            error: () => {
                this.isLoading = false;
                this.messageService.add({
                    severity: 'error',
                    detail: 'Add team failure',
                });
            },
        });
    }
}
