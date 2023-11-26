import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MentorDetail } from '@features/mentor/models/mentor.model';
import { MentorService } from '@features/mentor/services/mentor.service';
import { Team, TeamDetail } from '@features/team/models/team.model';
import { TeamService } from '@features/team/services/team.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-team-form',
    templateUrl: './team-form.component.html',
    styleUrls: ['./team-form.component.scss'],
})
export class TeamFormComponent implements OnInit, OnChanges {
    @Input() team?: TeamDetail;
    @Output() onSubmitSuccess = new EventEmitter<TeamDetail>();
    listMentor!: MentorDetail[];
    teamForm: any;
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

    ngOnChanges(): void {
        if (this.team) {
            this.teamForm = this.fb.group({
                name: this.fb.control(this.team.name),
                mentor: this.fb.control(
                    this.listMentor.find((i) => i.id === this.team?.mentor.id)
                ),
            });
        } else {
            this.teamForm = this.fb.group({
                name: this.fb.control('', [Validators.required]),
                mentor: this.fb.control(null, [Validators.required]),
            });
        }
    }

    handleSubmit() {
        this.isLoading = true;
        this.teamForm.disable();
        const name = this.teamForm.get('name').value;
        const mentorId = this.teamForm.get('mentor').value.id;
        const source = this.team
            ? this.teamService.updateTeam(this.team.id, name, mentorId)
            : this.teamService.createTeam({
                  name: name,
                  mentor: mentorId,
              });
        source.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.teamForm.reset();
                this.teamForm.enable();
                this.onSubmitSuccess.emit(response);
                this.messageService.add({
                    severity: 'success',
                    detail: this.team ? 'Update' : 'Add' + ' team successfully',
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
