import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'app/features/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            return true;
        }

        this.router.navigate(['login']);
        return false;
    }
}
