import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InternDetail, InternParams } from '../models/intern.model';
import { PageInfo, ResponsePagination } from '@shared/model/common';

@Injectable({
    providedIn: 'root',
})
export class InternService {
    constructor(private http: HttpClient) {}

    getInternList(
        pagination: PageInfo = {
            size: 10,
            page: 0,
        }
    ) {
        return this.http.get<ResponsePagination<InternDetail>>(
            'http://localhost:8080/api/v1/interns',
            {
                params: { ...pagination },
            }
        );
    }

    getInternListByMentor(
        pagination: PageInfo = {
            size: 10,
            page: 0,
        },
        mentorId: string
    ) {
        return this.http.get<ResponsePagination<InternDetail>>(
            'http://localhost:8080/api/v1/interns/mentor/' + mentorId,
            {
                params: { ...pagination },
            }
        );
    }

    getInternListByTeam(
        pagination: PageInfo = {
            size: 10,
            page: 0,
        },
        teamId: string
    ) {
        return this.http.get<ResponsePagination<InternDetail>>(
            'http://localhost:8080/api/v1/interns/team/' + teamId,
            {
                params: { ...pagination },
            }
        );
    }

    getInternById(id: string) {
        return this.http.get<InternDetail>(
            'http://localhost:8080/api/v1/interns/' + id
        );
    }

    createIntern(data: InternParams) {
        return this.http.post<InternDetail>(
            'http://localhost:8080/api/v1/interns',
            data
        );
    }

    updateIntern(id: string, data: InternParams) {
        return this.http.put<InternDetail>(
            'http://localhost:8080/api/v1/interns/' + id,
            data
        );
    }

    deleteIntern(id: string) {
        return this.http.delete('http://localhost:8080/api/v1/interns/' + id);
    }
}
