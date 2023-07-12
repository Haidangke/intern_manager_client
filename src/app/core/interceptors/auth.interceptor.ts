import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.cookieService.get('token');

        if (token) {
            const headers = req.headers.set('Authorization', `Bearer ${token}`);
            req = req.clone({ headers });
        }
        return next.handle(req);
    }
}
