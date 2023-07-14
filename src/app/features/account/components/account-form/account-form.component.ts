import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InternDetail } from '@features/intern/models/intern.model';
import { MentorDetail } from '@features/mentor/models/mentor.model';

@Component({
    selector: 'app-account-form',
    templateUrl: './account-form.component.html',
    styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {
    accountForm!: FormGroup;
    mentorList!: MentorDetail;
    internList!: InternDetail;

    isLinkedUser = true;

    roles = [
        {
            title: 'Admin',
            value: 'ROLE_ADMIN',
        },
        {
            title: 'Mentor',
            value: 'ROLE_MENTOR',
        },
        {
            title: 'Intern',
            value: 'ROLE_INTERN',
        },
    ];
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.accountForm = this.fb.group({
            username: this.fb.control(''),
            password: this.fb.control(''),
            role: this.fb.control('ROLE_INTERN'),
            linked_user: this.fb.control(''),
        });

        this.accountForm.valueChanges.subscribe((form) => {
            console.log(form);
            this.isLinkedUser = Boolean(
                form.role && form.role !== 'ROLE_ADMIN'
            );
        });
    }

    handleSubmit() {}
}
