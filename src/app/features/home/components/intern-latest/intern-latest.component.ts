import { Component, Input } from '@angular/core';
import { InternDetail } from '@features/intern/models/intern.model';
import { ColListData } from '@shared/components/list-data/list-data.model';

@Component({
    selector: 'app-intern-latest',
    templateUrl: './intern-latest.component.html',
})
export class InternLatestComponent {
    @Input() interns: InternDetail[] = [];
    isLoading = false;
    isDeleting = false;
    isCaption = false;
    ngOnInit() {
        this.interns = [...this.interns].splice(0, 3);
    }
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
