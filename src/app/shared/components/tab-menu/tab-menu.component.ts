import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-tab-menu',
    templateUrl: './tab-menu.component.html',
    styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuComponent {
    @Input() items!: MenuItem[];
    @Input() activeItem!: MenuItem;

    @Output() onActiveChange = new EventEmitter<MenuItem>();
}
