import { Component, OnInit } from '@angular/core';
import { HomeService, StarStudent } from './services/home.service';
import { InternService } from '@features/intern/services/intern.service';
import { MentorService } from '@features/mentor/services/mentor.service';
import { TeamService } from '@features/team/services/team.service';
import { ProjectService } from '@features/project/services';
import { InternDetail } from '@features/intern/models/intern.model';
import { MentorDetail } from '@features/mentor/models/mentor.model';
import { ProjectDetail } from '@features/project/models';
import { TeamDetail } from '@features/team/models/team.model';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    // columns = ['column 1', 'column 2', 'column 3', 'column 4'];
    columns = [
        {
            id: 1,
            title: 'Projects',
            count: 0,
            value: 'project',
        },
        {
            id: 2,
            title: 'Mentors',
            count: 0,
            value: 'mentor',
        },
        {
            id: 3,
            title: 'Interns',
            count: 0,
            value: 'intern',
        },
        {
            id: 4,
            title: 'Teams',
            count: 0,
            value: 'team',
        },
    ];

    fetching = false;

    interns: InternDetail[] = [];
    mentors: MentorDetail[] = [];
    projects: ProjectDetail[] = [];
    teams: TeamDetail[] = [];

    constructor(
        private internService: InternService,
        private mentorService: MentorService,
        private teamService: TeamService,
        private projectService: ProjectService
    ) {}

    ngOnInit() {
        this.fetching = true;
        forkJoin([
            this.internService.getInternList(),
            this.mentorService.getMentors(),
            this.teamService.getList(),
            this.projectService.getProjects(),
        ]).subscribe({
            next: (results) => {
                const [internRes, mentorRes, teamRes, projectRes] = results;
                this.interns = internRes.content;
                this.mentors = mentorRes.content;
                this.teams = teamRes.content;
                this.projects = projectRes.content;

                this.columns.forEach((col) => {
                    switch (col.value) {
                        case 'intern': {
                            col.count = this.interns.length;
                            break;
                        }
                        case 'mentor': {
                            col.count = this.mentors.length;
                            break;
                        }
                        case 'project': {
                            col.count = this.projects.length;
                            break;
                        }
                        case 'team': {
                            col.count = this.teams.length;
                            break;
                        }
                    }
                });
                this.fetching = false;
            },
        });
    }
}
