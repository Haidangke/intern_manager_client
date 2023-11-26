import { PageInfo, ResponsePagination } from '@shared/model/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamDetail, TeamParams } from '../models/team.model';

@Injectable({
    providedIn: 'root',
})
export class TeamService {
    constructor(private http: HttpClient) {}

    getList(
        pr: PageInfo = {
            page: 0,
            size: 10,
        },
        mentorId?: string
    ) {
        const params = { ...pr, mentor: mentorId ?? '' };
        return this.http.get<ResponsePagination<TeamDetail>>(
            'http://localhost:8080/api/v1/teams',
            {
                params: params,
            }
        );
    }

    createTeam(team: TeamParams) {
        return this.http.post<TeamDetail>(
            'http://localhost:8080/api/v1/teams',
            team
        );
    }

    getTeamById(id: number) {
        return this.http.get<TeamDetail>(
            `http://localhost:8080/api/v1/teams/${id}`
        );
    }

    updateTeam(id: string, name: string, mentor: string) {
        return this.http.put<TeamDetail>(
            `http://localhost:8080/api/v1/teams/${id}`,
            {
                name,
                mentor,
            }
        );
    }

    deleteTeam(id: string) {
        return this.http.delete(`http://localhost:8080/api/v1/teams/${id}`);
    }
}
