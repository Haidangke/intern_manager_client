import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColListData } from '@shared/components/list-data/list-data.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Mentor, MentorDetail } from '../../models/mentor.model';
import { MentorService } from '../../services/mentor.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PageInfo } from '@shared/model/common';

@Component({
    selector: 'app-mentor-list',
    templateUrl: './mentor-list.component.html',
    styleUrls: ['./mentor-list.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class MentorListComponent {
    constructor(
        private mentorService: MentorService,
        private messageService: MessageService,
        private route: Router,
        private confirmationService: ConfirmationService
    ) {}
    ref!: DynamicDialogRef;
    mentorList: MentorDetail[] = [];
    searchKeyword: string = '';
    isFetching = false;
    isDeleting = false;
    isDialog = false;
    totalRecords = 0;

    pagination: PageInfo = {
        size: 10,
        page: 0,
    };

    cols: ColListData[] = [
        {
            field: 'name',
            type: 'link',
            url: ['mentors', 'id'],
        },
        {
            field: 'email',
        },
        {
            field: 'phone',
        },
        {
            field: 'address',
        },
        {
            header: 'Interns',
            field: 'totalIntern',
            type: 'quantity',
        },
        {
            header: 'Teams',
            field: 'totalTeam',
            type: 'quantity',
        },
        {
            field: 'gender',
        },
        {
            field: 'birthday',
            type: 'date',
        },
    ];

    ngOnInit() {
        this.fetchMentors();
    }

    fetchMentors() {
        this.isFetching = true;
        this.mentorService.getMentors(this.pagination).subscribe({
            next: (response) => {
                this.isFetching = false;
                this.mentorList = response.content;
                this.totalRecords = response.totalElements;
            },
            error: () => {
                this.isFetching = false;
                this.messageService.add({
                    severity: 'error',
                    detail: 'Get teacher list failed. Please try again later',
                });
            },
        });
    }

    handlePageChange(event: any) {
        this.pagination.page = event.page;
        this.fetchMentors();
    }

    handleSizeChange(event: any) {
        this.pagination.size = event.value;
        this.fetchMentors();
    }

    handleSubmitSuccess() {
        this.isDialog = false;
        this.fetchMentors();
    }

    handleUpdateMentor(mentor: MentorDetail) {
        this.route.navigate([`/mentors/${mentor.id}`], {
            queryParams: {
                edit: true,
            },
        });
    }

    handleDeleteMentor(mentor: MentorDetail) {
        const { id, name } = mentor;
        this.confirmationService.confirm({
            header: 'Delete Mentor',
            message: 'Are you sure that you want to delete this mentor ?',
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.isDeleting = true;
                this.mentorService.deleteMentor(id).subscribe({
                    next: () => {
                        this.isDeleting = false;
                        this.mentorList = [...this.mentorList].filter(
                            (mentor) => mentor.id !== id
                        );
                        this.messageService.add({
                            severity: 'success',
                            detail: `Mentor ${name} has been deleted successfully!`,
                        });
                    },
                    error: (error) => {
                        this.isDeleting = false;

                        this.messageService.add({
                            severity: 'error',
                            detail: `Mentor ${name} could not be deleted!.`,
                        });
                    },
                });
            },
        });
    }
}
