import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const accountJSON = localStorage.getItem('account');
        const account = JSON.parse(accountJSON as string);
        switch (account.role) {
            case 'ROLE_ADMIN': {
                return true;
            }
            case 'ROLE_INTERN': {
                this.router.navigate(['interns', account.intern.id]);
                return false;
            }
            default: {
                return false;
            }
        }
    }
}
