import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MentorDetail, MentorParams } from '../models/mentor.model';
import { PageInfo, ResponsePagination } from '@shared/model/common';

@Injectable({
    providedIn: 'root',
})
export class MentorService {
    constructor(private http: HttpClient) {}

    getMentors(
        pr: PageInfo = {
            page: 0,
            size: 10,
        }
    ) {
        return this.http.get<ResponsePagination<MentorDetail>>(
            'http://localhost:8080/api/v1/mentors',
            {
                params: { ...pr },
            }
        );
    }

    getMentorById(id: string) {
        return this.http.get<MentorDetail>(
            'http://localhost:8080/api/v1/mentors/' + id
        );
    }

    deleteMentor(id: string) {
        return this.http.delete('http://localhost:8080/api/v1/mentors/' + id);
    }

    createMentor(mentor: MentorParams) {
        return this.http.post<MentorDetail>(
            'http://localhost:8080/api/v1/mentors',
            mentor
        );
    }

    updateMentor(id: string, mentor: MentorParams) {
        return this.http.put<MentorDetail>(
            'http://localhost:8080/api/v1/mentors/' + id,
            mentor
        );
    }
}
