import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, ProjectParams } from '../models/project.model';
@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    constructor(private http: HttpClient) {}

    createProject(project: ProjectParams) {
        return this.http.post<Project>(
            'http://localhost:8080/api/v1/projects',
            project
        );
    }
}
