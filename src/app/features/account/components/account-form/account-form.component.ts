import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService } from '@features/account/services/account.service';
import { InternDetail } from '@features/intern/models/intern.model';
import { InternService } from '@features/intern/services/intern.service';
import { MentorDetail } from '@features/mentor/models/mentor.model';
import { MentorService } from '@features/mentor/services/mentor.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-account-form',
    templateUrl: './account-form.component.html',
    styleUrls: ['./account-form.component.scss'],
    providers: [],
})
export class AccountFormComponent implements OnInit {
    accountForm = this.fb.group({
        username: this.fb.control(''),
        password: this.fb.control(''),
        role: this.fb.control<any>('ROLE_INTERN'),
        linked_user: this.fb.control(''),
    });
    mentorList!: MentorDetail[];
    internList!: InternDetail[];

    isLinkedUser = true;

    roles = [
        {
            title: 'Mentor',
            value: 'ROLE_MENTOR',
        },
        {
            title: 'Intern',
            value: 'ROLE_INTERN',
        },
    ];

    @Output() onSuccess = new EventEmitter();
    constructor(
        private fb: FormBuilder,
        private accountService: AccountService,
        private messageService: MessageService,
        private mentorService: MentorService,
        private internService: InternService
    ) {}

    ngOnInit(): void {
        this.accountForm = this.fb.group({
            username: this.fb.control(''),
            password: this.fb.control(''),
            role: this.fb.control('ROLE_INTERN'),
            linked_user: this.fb.control(''),
        });

        this.accountForm.valueChanges.subscribe((form) => {
            this.isLinkedUser = Boolean(
                form.role && form.role !== 'ROLE_ADMIN'
            );
        });
        this.mentorService.getMentors().subscribe((res) => {
            this.mentorList = res.content.filter((mentor) => !mentor.account);
        });
        this.internService.getInternList().subscribe((res) => {
            this.internList = res.content.filter((intern) => !intern.account);
        });
    }

    handleSubmit() {
        const { username, password, role, linked_user } =
            this.accountForm.value;
        this.accountService
            .createAccount({
                username: username ?? '',
                password: password ?? '',
                role: role ?? 'ROLE_INTERN',
                intern: role == 'ROLE_INTERN' ? linked_user ?? '' : undefined,
                mentor: role == 'ROLE_MENTOR' ? linked_user ?? '' : undefined,
            })
            .subscribe({
                next: () => {
                    this.onSuccess.emit();
                },
            });
    }
}
