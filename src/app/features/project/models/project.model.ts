import { InternDetail } from '@features/intern/models/intern.model';

export interface Project {
    id: string;
    name: string;
    interns: InternDetail[];
}

export interface ProjectParams {
    name: string;
    interns: string[];
}

export interface ProjectDetail extends Project {
    totalIntern: number;
}
