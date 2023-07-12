import { Team } from '@features/team/models/team.model';
import { Mentor } from '@features/mentor/models/mentor.model';

export interface Intern {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    birthday: string;
    technology: string;
    description: string;
    status: string;
}

export interface InternParams extends Intern {
    name: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    birthday: string;
    technology: string;
    description: string;
    status: string;
    mentor: string;
    team: string;
    account?: string;
}

export interface InternDetail extends Intern {
    mentor: Mentor;
    team: Team;
}
