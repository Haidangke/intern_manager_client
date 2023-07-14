import { Component, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

const BREAD_CRUMB = ['interns', 'mentors', 'teams'];

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
    constructor(private router: Router) {}
    items!: MenuItem[];
    home!: MenuItem;

    isDisplay: boolean = false;

    ngOnInit() {
        this.router.events
            .pipe(filter((event) => event instanceof Scroll))
            .subscribe((event: any) => {
                const url: string = event.routerEvent.url;
                if (!url) return;
                const urls = url.split('/').filter((url) => url);

                this.isDisplay = !urls.includes('home') && urls.length > 0;
                this.items = urls.map((url) => {
                    return {
                        label: BREAD_CRUMB.includes(url)
                            ? url
                            : urls[0] + ' Detail',
                        routerLink: BREAD_CRUMB.includes(url) ? url : null,
                    };
                });
            });

        this.home = { icon: 'pi pi-home', routerLink: '/home' };
    }
}
