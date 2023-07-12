import { Component } from '@angular/core';
import { ColListData } from '@shared/components/list-data/list-data.model';
import { interns } from 'app/features/intern/intern.data';

@Component({
    selector: 'app-intern-latest',
    templateUrl: './intern-latest.component.html',
})
export class InternLatestComponent {
    interns: any[] = interns;
    isLoading = false;
    isDeleting = false;
    isCaption = false;
    cols: ColListData[] = [
        {
            field: 'id',
            header: '#',
        },
        {
            field: 'name',
            type: 'link',
            url: ['interns', 'id'],
        },
        {
            field: 'email',
        },
        {
            field: 'mentor',
            type: 'child',
            child: {
                url: ['mentors', 'id'],
                field: 'name',
            },
        },
        {
            field: 'phone',
        },
    ];
}
