import { Intern } from '@features/intern/models/intern.model';
import { Mentor } from '@features/mentor/models/mentor.model';

export type Role = 'ROLE_ADMIN' | 'ROLE_MENTOR' | 'ROLE_INTERN';

export interface Account {
    id: string;
    username: string;
    password: string;
    role: Role;
}

export interface AccountParams {
    username: string;
    password: string;
    role: Role;

    intern?: string;
    mentor?: string;
}

export interface AccountDetail extends Account {
    linked_user?: Intern | Mentor;
}
export interface AccountResponse extends Account {
    intern?: Intern;
    mentor?: Mentor;
}
