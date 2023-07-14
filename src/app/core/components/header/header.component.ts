import {
    Component,
    ElementRef,
    EventEmitter,
    Output,
    Renderer2,
    ViewChild,
} from '@angular/core';

import { AccountDetail } from '@features/account/models/account.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    name!: string;
    role!: string;
    showDropdown = false;
    searchInput = '';

    @ViewChild('dropdown') dropdown!: ElementRef;
    @ViewChild('userMenu') userMenu!: ElementRef;

    @Output() onDisplay = new EventEmitter<boolean>();

    constructor(private renderer: Renderer2, private router: Router) {}

    ngOnInit() {
        const account: AccountDetail = JSON.parse(
            localStorage.getItem('account') as string
        );

        this.name = account.username;
        if (account.role === 'ROLE_ADMIN') {
            this.role = 'admin';
        }

        this.renderer.listen('window', 'click', (e: Event) => {
            if (
                !this.userMenu.nativeElement.contains(e.target) &&
                !this.dropdown.nativeElement.contains(e.target)
            ) {
                this.showDropdown = false;
            }
        });
    }

    onClickUserMenu() {
        this.showDropdown = !this.showDropdown;
    }

    onClickOutsideUserIcon() {
        this.showDropdown = false;
    }

    handleLogout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('account');
        this.router.navigate(['login']);
    }
}
