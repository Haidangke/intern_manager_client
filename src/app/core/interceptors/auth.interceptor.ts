import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    BASE_URL = 'http://localhost:8080/api/v1';
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let headers;
        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            });
        } else {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
            });
        }

        const url = req.url.startsWith('http')
            ? req.url
            : `${this.BASE_URL}/${req.url}`;

        const modifiedRequest = req.clone({
            url,
            headers,
        });

        return next.handle(modifiedRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate(['login']);
                }

                if (error.status === 403) {
                    console.log({ error });
                }

                return throwError(() => error);
            })
        );
    }
}
