import { InternDetail } from '@features/intern/models/intern.model';
import { Project } from './project.model';

export interface ProjectInternParams {
    interns: string[];
    project: string;
}

export interface ProjectInternDetail {
    id: string;
    intern: InternDetail;
    project: Project;
}
