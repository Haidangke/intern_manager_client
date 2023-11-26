// avatar.component.ts
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styles: [],
})
export class AvatarComponent {
    @Input() name = '';
    @Input() class = '';
    @Input() textClass = '';
    @Input() isAdmin = false;

    ngOnInit() {
        this.name =
            this.name ||
            JSON.parse(localStorage.getItem('account') ?? '').username;
    }
    get displayInitial(): string {
        return this.name ? this.name[0].toUpperCase() : '';
    }
}
