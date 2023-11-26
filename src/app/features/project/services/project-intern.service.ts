import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectInternDetail, ProjectInternParams } from '../models';
import { PageInfo, ResponsePagination } from '@shared/model/common';

@Injectable({
    providedIn: 'root',
})
export class ProjectInternService {
    constructor(private http: HttpClient) {}

    getListProjectIntern(
        projectId: string,
        pr: PageInfo = {
            page: 0,
            size: 10,
        }
    ) {
        return this.http.get<ResponsePagination<ProjectInternDetail>>(
            `project_intern/project/${projectId}`,
            {
                params: { ...pr },
            }
        );
    }

    addInternFromProject(data: ProjectInternParams) {
        return this.http.post<ProjectInternDetail[]>('project_intern', data);
    }

    deleteInternFromProject(id: string) {
        return this.http.delete(`project_intern/${id}`);
    }
}
