import { Component, OnInit } from '@angular/core';
import { HomeService, StarStudent } from './services/home.service';

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
            count: '50+',
            new: 23,
        },
        {
            id: 2,
            title: 'Mentors',
            count: '20',
            new: 12,
        },
        {
            id: 3,
            title: 'Interns',
            count: '400',
            new: 48,
        },
        {
            id: 4,
            title: 'Teams',
            count: '20+',
            new: 1,
        },
    ];

    starStudentList: StarStudent[] = [];

    constructor(private homeService: HomeService) {}

    ngOnInit() {}
}
