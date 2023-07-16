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
        return this.http.get<ResponsePagination<InternDetail>>('interns', {
            params: { ...pagination },
        });
    }

    getInternListByMentor(
        mentorId: string,
        pagination: PageInfo = {
            size: 10,
            page: 0,
        }
    ) {
        return this.http.get<ResponsePagination<InternDetail>>(
            'interns/mentor/' + mentorId,
            {
                params: { ...pagination },
            }
        );
    }

    getInternListByTeam(
        teamId: string,
        pagination: PageInfo = {
            size: 10,
            page: 0,
        }
    ) {
        return this.http.get<ResponsePagination<InternDetail>>(
            'interns/team/' + teamId,
            {
                params: { ...pagination },
            }
        );
    }

    getInternListNotInProject(
        projectId: string,
        pagination: PageInfo = {
            size: 10,
            page: 0,
        }
    ) {
        return this.http.get<ResponsePagination<InternDetail>>(
            `interns/project/not/${projectId}`,
            {
                params: { ...pagination },
            }
        );
    }

    getInternById(id: string) {
        return this.http.get<InternDetail>(`interns/${id}`);
    }

    createIntern(data: InternParams) {
        return this.http.post<InternDetail>('interns', data);
    }

    updateIntern(id: string, data: InternParams) {
        return this.http.put<InternDetail>(`interns/${id}`, data);
    }

    deleteIntern(id: string) {
        return this.http.delete(`interns/${id}`);
    }
}
