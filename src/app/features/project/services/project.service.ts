import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageInfo, ResponsePagination } from '@shared/model/common';
import { ProjectDetail, ProjectParams } from '../models';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    constructor(private http: HttpClient) {}

    getProject(id: string) {
        return this.http.get<ProjectDetail>(`projects/${id}`);
    }

    getProjects(
        pr: PageInfo = {
            page: 0,
            size: 10,
        }
    ) {
        return this.http.get<ResponsePagination<ProjectDetail>>('projects', {
            params: { ...pr },
        });
    }

    createProject(project: ProjectParams) {
        return this.http.post<ProjectDetail>('projects', project);
    }

    updateProject(id: string, project: ProjectParams) {
        return this.http.put<ProjectDetail>(`projects/${id}`, project);
    }

    deleteProject(id: string) {
        return this.http.delete(`projects/${id}`);
    }


}
