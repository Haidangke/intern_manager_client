import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface StarStudent {
    id: number;
    name: string;
    average: number;
}

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor(private http: HttpClient) {}
}
