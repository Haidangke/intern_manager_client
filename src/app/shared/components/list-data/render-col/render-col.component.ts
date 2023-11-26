import { Component, Input, OnInit } from '@angular/core';
import { ColListData } from '../list-data.model';
@Component({
    selector: 'app-render-col',
    templateUrl: './render-col.component.html',
})
export class RenderColComponent implements OnInit {
    @Input() col!: ColListData;
    @Input() rowData: any;
    link!: string;
    content!: string;

    ngOnInit(): void {
        this.render(this.col, this.rowData);
    }

    render(col: ColListData, rowData: any): any {
        if (col.child) {
            return this.render(col.child, rowData[col.field]);
        }

        if (col.url) {
            this.link = `${col.url[0]}/${rowData[col.url[1]]}`;
            this.content = rowData[col.field];
        }
        this.content = rowData[col.field];
    }
}
