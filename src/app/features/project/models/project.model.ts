export interface Project {
    id: string;
    name: string;
}

export interface ProjectParams {
    name: string;
}

export interface ProjectDetail extends Project {
    totalIntern: number;
}
