import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Intern, InternDetail } from '../../models/intern.model';
import { InternService } from '../../services/intern.service';
import { MenuItem } from 'primeng/api';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-student-detail',
    templateUrl: './intern-detail.component.html',
    styleUrls: ['./intern-detail.component.scss'],
})
export class StudentDetailComponent {
    items: MenuItem[] = [
        { label: 'Info', icon: 'pi pi-fw pi-home', id: 'info' },
        { label: 'Edit', icon: 'pi pi-fw pi-calendar', id: 'edit' },
        { label: 'Report', icon: 'pi pi-fw pi-calendar', id: 'report' },
    ];

    activeItem!: MenuItem;
    isFetching = false;
    intern!: InternDetail;

    constructor(
        private internService: InternService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.fetchInternById();

        this.route.queryParams.subscribe((queryParams) => {
            const edit = queryParams['edit'];
            if (edit) {
                this.activeItem = this.items[1];
            } else {
                this.activeItem = this.items[1];
            }
        });
    }

    fetchInternById() {
        this.isFetching = true;
        this.route.params
            .pipe(
                switchMap((params: Params) => {
                    const id = params['id'];
                    return this.internService.getInternById(id);
                })
            )
            .subscribe({
                next: (response) => {
                    this.intern = response;
                    this.isFetching = false;
                },
                error: () => {
                    this.isFetching = false;
                },
            });
    }

    handleActiveItemChange(event: MenuItem) {
        this.activeItem = event;
    }
}
