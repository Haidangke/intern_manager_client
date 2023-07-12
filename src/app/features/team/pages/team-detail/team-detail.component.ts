import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { TeamDetail } from '../../models/team.model';
import { TeamService } from '../../services/team.service';

@Component({
    selector: 'app-team-detail',
    templateUrl: './team-detail.component.html',
    styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent implements OnInit {
    constructor(
        private teamService: TeamService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}
    team!: TeamDetail;
    isLoading = false;
    ngOnInit(): void {
        this.fetchTeam();
    }
    fetchTeam() {
        this.isLoading = true;
        this.activatedRoute.params
            .pipe(
                switchMap((params: Params) => {
                    const id = params['id'];
                    return this.teamService.getTeamById(id);
                })
            )
            .subscribe({
                next: (response) => {
                    this.team = response;
                    this.isLoading = false;
                },
                error: () => {
                    this.isLoading = false;
                    this.router.navigate(['teams']);
                },
            });
    }
}
