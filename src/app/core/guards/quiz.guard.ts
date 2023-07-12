import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, take} from "rxjs";

@Injectable({providedIn: "root"})
export class LoginGuard implements CanActivate {
  constructor( private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAuth = Boolean(localStorage.getItem('isLogin'));
        if (!isAuth) {
          return this.router.createUrlTree(['/quiz']);
        }
        return true;
  }

}
