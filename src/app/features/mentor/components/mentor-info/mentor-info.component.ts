import { Component, Input, OnInit } from '@angular/core';
import { Mentor } from '../../models/mentor.model';
import { MenuItem } from 'primeng/api';
import { InternDetail } from '@features/intern/models/intern.model';
import { InternService } from '@features/intern/services/intern.service';
import { PageInfo } from '@shared/model/common';
import { ColListData } from '@shared/components/list-data/list-data.model';
import { TeamService } from '@features/team/services/team.service';
import { TeamDetail } from '@features/team/models/team.model';

@Component({
    selector: 'app-mentor-info',
    templateUrl: './mentor-info.component.html',
    styleUrls: ['./mentor-info.component.scss'],
})
export class MentorInfoComponent implements OnInit {
    constructor(
        private internService: InternService,
        private teamService: TeamService
    ) {}

    @Input() mentor!: Mentor;
    internList!: InternDetail[];
    teamList!: TeamDetail[];
    isFetching = false;

    internCols: ColListData[] = [
        {
            field: 'name',
            type: 'link',
            url: ['interns', 'id'],
        },
        {
            field: 'email',
        },
        {
            field: 'gender',
        },
        {
            header: 'phone number',
            field: 'phone',
        },
        {
            field: 'status',
        },
        {
            field: 'team',
            type: 'child',
            child: {
                field: 'name',
                url: ['teams', 'id'],
            },
        },
    ];

    teamCols: ColListData[] = [
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

    items: MenuItem[] = [
        { label: 'Info', icon: 'pi pi-fw pi-home', id: 'info' },
        { label: 'Edit', icon: 'pi pi-fw pi-calendar', id: 'edit' },
    ];

    activeItem: MenuItem = this.items[0];

    subTabs: MenuItem[] = [
        { label: 'Intern', icon: 'pi pi-fw pi-home', id: 'intern' },
        { label: 'Team', icon: 'pi pi-fw pi-calendar', id: 'team' },
    ];

    activeSubTab: MenuItem = this.subTabs[0];

    ngOnInit(): void {
        this.fetchInternList();
    }

    fetchInternList() {
        this.isFetching = true;
        this.internService.getInternList(undefined, this.mentor.id).subscribe({
            next: (response) => {
                this.isFetching = false;

                this.internList = response.content;
            },
            error: () => {
                this.isFetching = false;
            },
        });
    }

    fetchTeamList() {
        this.isFetching = true;
        this.teamService.getList(undefined, this.mentor.id).subscribe({
            next: (response) => {
                this.isFetching = false;
                this.teamList = response.content;
            },
            error: () => {
                this.isFetching = false;
            },
        });
    }

    onTabChange(event: MenuItem) {
        this.activeSubTab = event;
        if (event.id === 'intern') {
            this.fetchInternList();
        } else {
            this.fetchTeamList();
        }
    }
}
