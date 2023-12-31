import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ColListData } from './list-data.model';
import { PageInfo } from '@shared/model/common';
import { Table } from 'primeng/table';

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

    @ViewChild('dt1') dt1!: Table;

    recordsColSpan!: number;
    rows = 10;
    first = 0;

    @Output() onAdd = new EventEmitter();
    @Output() onDelete = new EventEmitter<any>();
    @Output() onUpdate = new EventEmitter<any>();
    @Output() onPageChange = new EventEmitter<number>();
    @Output() onSizeChange = new EventEmitter<number>();

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

    search(event: any) {
        this.dt1.filterGlobal(event.target?.value, 'contains')
    }

}
