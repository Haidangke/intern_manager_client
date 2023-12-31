import { Mentor } from '@features/mentor/models/mentor.model';

export interface Team {
    id: string;
    name: string;
}

export interface TeamParams {
    name: string;
    mentor: string;
}

export interface TeamDetail extends Team {
    mentor: Mentor;
    totalIntern: number;
}
