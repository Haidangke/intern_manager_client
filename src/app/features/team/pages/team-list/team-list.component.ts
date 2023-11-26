import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Team, TeamDetail } from '../../models/team.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PageInfo } from '@shared/model/common';
import { ColListData } from '@shared/components/list-data/list-data.model';

@Component({
    selector: 'app-team-list',
    templateUrl: './team-list.component.html',
    providers: [DialogService, ConfirmationService],
})
export class TeamListComponent implements OnInit {
    constructor(
        private teamService: TeamService,
        private router: Router,
        private dialogService: DialogService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    listTeam: TeamDetail[] = [];
    isLoading: boolean = false;
    isDeleting: boolean = false;
    isDialog = false;
    curTeam?: TeamDetail;

    pageInfo: PageInfo = {
        size: 10,
        page: 0,
    };

    cols: ColListData[] = [
        {
            field: 'name',
            type: 'link',
            url: ['teams', 'id'],
        },
        {
            header: 'Interns',
            field: 'totalIntern',
        },
        {
            header: 'Mentor',
            field: 'mentor',
            type: 'child',
            child: {
                field: 'name',
                url: ['mentors', 'id'],
            },
        },
    ];

    ngOnInit() {
        this.getListTeam();
    }

    getListTeam() {
        this.isLoading = true;
        this.teamService.getList(this.pageInfo).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.listTeam = response.content;
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    detail: 'Get list team failure',
                });
                this.isLoading = false;
            },
        });
    }

    /* Handle Create */

    handleUpdateTeam(team: TeamDetail) {
        this.isDialog = true;
        this.curTeam = team;
    }

    /* Show Model to choice Delete or not */
    handleDeleteTeam(team: Team) {
        const { id, name } = team;
        this.confirmationService.confirm({
            header: 'Delete Technology',
            message: 'Are you sure that you want to delete this technology?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.isDeleting = true;
                // Listen fetch event
                this.teamService.deleteTeam(id).subscribe({
                    next: () => {
                        this.isDeleting = false;
                        this.messageService.add({
                            severity: 'success',
                            detail: `Delete technology "${name}" successfully`,
                        });
                        // Remove this student on student list
                        this.getListTeam();
                        // Reset student id to delete
                    },
                    error: () => {
                        this.isDeleting = false;
                        this.messageService.add({
                            severity: 'error',
                            detail: `Delete technology "${name}" failure`,
                        });
                    },
                });
            },
        });
    }

    onSubmitTeam() {
        this.getListTeam();
        this.isDialog = false;
    }

    onHide() {
        this.curTeam = undefined;
        console.log(this.curTeam);
    }
}
