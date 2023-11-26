import { Account } from "@features/account/models/account.model";

export interface Mentor {
    id: string;
    name: string;
    email: string;
    gender: string;
    birthday: string;
    address: string;
    phone: string;
    account: Account;
}

export interface MentorParams extends Mentor {
    name: string;
    email: string;
    gender: string;
    birthday: string;
    address: string;
    phone: string;
}

export interface MentorDetail extends Mentor {
    totalIntern: number;
    totalTeam: number;
}
