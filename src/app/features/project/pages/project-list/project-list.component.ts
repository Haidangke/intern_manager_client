import { ProjectService } from '../../services/project.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectDetail } from '../../models/project.model';
import { ColListData } from '@shared/components/list-data/list-data.model';
import { PageInfo } from '@shared/model/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    providers: [ConfirmationService, DialogService, MessageService],
})
export class ProjectListComponent {
    constructor(
        private messageService: MessageService,
        private route: Router,
        private confirmationService: ConfirmationService,
        private projectService: ProjectService
    ) {}
    ref!: DynamicDialogRef;
    projectList: ProjectDetail[] = [];
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
            url: ['projects', 'id'],
        },

        { header: 'Interns', field: 'totalIntern', type: 'quantity' },
    ];

    ngOnInit() {
        this.fetchProjects();
    }

    fetchProjects() {
        this.isFetching = true;
        this.projectService.getProjects(this.pagination).subscribe({
            next: (res) => {
                this.projectList = res.content;
                this.totalRecords = res.totalElements;
                this.isFetching = false;
            },
            error: (error) => {
                this.isFetching = false;
            },
        });
    }

    handlePageChange(event: any) {
        this.pagination.page = event.page;
        this.fetchProjects();
    }

    handleSizeChange(event: any) {
        this.pagination.size = event.value;
        this.fetchProjects();
    }

    handleSubmitSuccess() {
        this.fetchProjects();
    }

    handleUpdateProject(project: ProjectDetail) {
        console.log(project);
        this.isDialog = true;
    }

    handleDeleteProject(project: ProjectDetail) {
        const { id, name } = project;
        this.confirmationService.confirm({
            header: 'Delete Project',
            message: 'Are you sure that you want to delete this project ?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.isDeleting = true;
                this.projectService.deleteProject(id).subscribe({
                    next: () => {
                        this.isDeleting = false;
                        this.projectList = [...this.projectList].filter(
                            (mentor) => mentor.id !== id
                        );
                        this.messageService.add({
                            severity: 'success',
                            detail: `Project ${name} has been deleted successfully!`,
                        });
                    },
                    error: (error) => {
                        this.isDeleting = false;
                        this.messageService.add({
                            severity: 'error',
                            detail: `Project ${name} could not be deleted!.`,
                        });
                    },
                });
            },
        });
    }
}
