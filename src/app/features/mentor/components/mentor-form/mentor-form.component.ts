import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MentorDetail } from '../../models/mentor.model';
import { MentorService } from '../../services/mentor.service';
import { GENDER_DROPDOWN } from '@shared/constants';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'app-mentor-form',
    templateUrl: './mentor-form.component.html',
    styleUrls: ['./mentor-form.component.scss'],
})
export class MentorFormComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private mentorService: MentorService,
        private messageService: MessageService
    ) {}
    mentorForm!: FormGroup;
    isLoading = false;

    @Input() mentor?: MentorDetail;
    @Output() mentorChange = new EventEmitter<MentorDetail>();
    @Input() isDialog = false;
    @Output() onSubmitSuccess = new EventEmitter();

    genders = GENDER_DROPDOWN;

    ngOnInit(): void {
        this.mentorForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(6)]],
            gender: ['male', [Validators.required]],
            birthday: [null, [Validators.required]],
            address: ['', [Validators.required]],
            phone: [
                null,
                [Validators.required, Validators.pattern('[- +()0-9]+')],
            ],
            email: [
                null,
                [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(6),
                ],
            ],
        });

        if (this.mentor) {
            const { name, gender, birthday, address, phone, email } =
                this.mentor;
            this.mentorForm.setValue({
                name,
                gender,
                birthday: new Date(birthday),
                address,
                phone,
                email,
            });
        }
    }

    handleSubmitting(loading: boolean) {
        this.isLoading = loading;
        if (loading) {
            this.mentorForm.disable();
        } else {
            this.mentorForm.enable();
            this.mentorForm.reset();
        }
    }

    handleSubmit() {
        this.handleSubmitting(true);
        if (this.mentor) {
            this.mentorService
                .updateMentor(this.mentor.id, {
                    ...this.mentorForm.value,
                })
                .subscribe({
                    next: (res) => {
                        this.messageService.add({
                            severity: 'success',
                            detail: 'Update mentor successfully',
                        });
                        this.onSubmitSuccess.emit();

                        this.handleSubmitting(false);
                        this.mentorForm.setValue({
                            name: res.name,
                            gender: res.gender,
                            birthday: new Date(res.birthday),
                            address: res.address,
                            phone: res.phone,
                            email: res.email,
                        });
                        this.mentorChange.emit(res);
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Update mentor failure',
                        });
                        this.handleSubmitting(false);
                    },
                });
        } else {
            this.mentorService.createMentor(this.mentorForm.value).subscribe({
                next: () => {
                    this.mentorForm.reset();
                    this.onSubmitSuccess.emit();
                    this.messageService.add({
                        severity: 'success',
                        detail: 'Create mentor successfully',
                    });
                    this.handleSubmitting(false);
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        detail: 'Create mentor failure',
                    });
                    this.handleSubmitting(false);
                },
            });
        }
    }
}
