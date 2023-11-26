import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Mentor, MentorDetail } from '../../models/mentor.model';
import { switchMap } from 'rxjs';
import { MentorService } from '../../services/mentor.service';

@Component({
    selector: 'app-mentor-detail',
    templateUrl: './mentor-detail.component.html',
    styleUrls: ['./mentor-detail.component.scss'],
})
export class MentorDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private mentorService: MentorService
    ) {}

    isFetching = false;
    mentor?: MentorDetail;

    items: MenuItem[] = [
        { label: 'Info', icon: 'pi pi-fw pi-home', id: 'info' },
        { label: 'Edit', icon: 'pi pi-fw pi-calendar', id: 'edit' },
    ];

    activeItem: MenuItem = this.items[0];

    ngOnInit(): void {
        this.fetchMentor();
    }

    fetchMentor() {
        this.isFetching = true;

        this.route.queryParams.subscribe((query) => {
            if (query['edit'] === 'true') {
                this.activeItem = this.items[1];
            }
        });

        this.route.params
            .pipe(
                switchMap((params) => {
                    const id = params['id'];
                    console.log(params);
                    return this.mentorService.getMentorById(id);
                })
            )
            .subscribe({
                next: (response) => {
                    this.mentor = response;
                    this.isFetching = false;
                },
                error() {
                    console.log('error');
                },
            });
    }

    onChangeTab(tab: any) {
        console.log(tab);
        this.activeItem = tab;
    }
}
