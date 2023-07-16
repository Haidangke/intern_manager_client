import { Component, Input, OnInit } from '@angular/core';
import { Mentor } from '../../models/mentor.model';
import { MenuItem } from 'primeng/api';
import { InternDetail } from '@features/intern/models/intern.model';
import { InternService } from '@features/intern/services/intern.service';
import { PageInfo } from '@shared/model/common';
import { ColListData } from '@shared/components/list-data/list-data.model';

@Component({
    selector: 'app-mentor-info',
    templateUrl: './mentor-info.component.html',
    styleUrls: ['./mentor-info.component.scss'],
})
export class MentorInfoComponent implements OnInit {
    constructor(private internService: InternService) {}

    @Input() mentor!: Mentor;
    internList!: InternDetail[];
    internFetching = false;

    pagination: PageInfo = {
        page: 0,
        size: 10,
    };

    cols: ColListData[] = [
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

    totalRecords!: number;

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
        this.internFetching = true;
        this.internService.getInternList(this.pagination).subscribe({
            next: (response) => {
                this.internFetching = false;

                this.totalRecords = response.totalElements;
                this.internList = response.content;
            },
            error: () => {
                this.internFetching = false;
            },
        });
    }
}
