import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColListData } from './list-data.model';
import { PageInfo } from '@shared/model/common';

@Component({
    selector: 'app-list-data',
    templateUrl: './list-data.component.html',
    styleUrls: ['./list-data.component.scss'],
})
export class ListDataComponent implements OnInit {
    @Input() data!: any[];
    @Input() cols!: ColListData[];
    @Input() title: string = '';
    @Input() subTitles: string = '';
    @Input() fetching!: boolean;

    @Input() actions: ('update' | 'delete')[] = [];
    @Input() pagination!: PageInfo;
    @Input() deleting!: boolean;
    @Input() isCaption = true;
    @Input() totalRecords = 0;

    recordsColSpan!: number;
    rows = 10;
    first = 0;

    @Output() onAdd = new EventEmitter();
    @Output() onDelete = new EventEmitter<any>();
    @Output() onUpdate = new EventEmitter<any>();
    @Output() onPageChange = new EventEmitter<number>();
    @Output() onSizeChange = new EventEmitter<number>();
    @Output() onSearch = new EventEmitter<any>();

    ngOnInit(): void {
        this.recordsColSpan = this.cols.length + 1;
        if (this.actions.length > 0) {
            this.recordsColSpan++;
        }
    }

    handlePageChange(event: any) {
        console.log(event);
        this.first = event.first;
        this.rows = event.rows;
        this.onPageChange.emit(event);
    }

   
}
