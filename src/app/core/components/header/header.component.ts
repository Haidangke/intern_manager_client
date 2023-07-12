import { Subject } from 'rxjs';
import {
    Component,
    ElementRef,
    EventEmitter,
    Output,
    Renderer2,
    ViewChild,
} from '@angular/core';
import {
    faBars,
    faBell,
    faChevronDown,
    faMaximize,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'app/features/auth/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    name!: string;
    showDropdown = false;
    icons = { faBars, faBell, faMaximize, faChevronDown };
    searchInput = '';

    @ViewChild('dropdown') dropdown!: ElementRef;
    @ViewChild('userMenu') userMenu!: ElementRef;

    @Output() onDisplay = new EventEmitter<boolean>();

    constructor(
        private renderer: Renderer2,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.authService.user.subscribe((user) => {
            this.name = user;
        });

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

    onLogout() {
        this.authService.resetAuth();
    }
}
