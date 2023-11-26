import { InternDetail } from './../../../intern/models/intern.model';
import { ProjectService } from '../../services/project.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Project, ProjectDetail } from '../../models/project.model';
import { ColListData } from '@shared/components/list-data/list-data.model';
import { PageInfo } from '@shared/model/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InternService } from '@features/intern/services/intern.service';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class ProjectListComponent {
    constructor(
        private route: Router,
        private confirmationService: ConfirmationService,
        private projectService: ProjectService,
        private internService: InternService,
        private messageService: MessageService
    ) {}
    ref!: DynamicDialogRef;
    projectList: ProjectDetail[] = [];
    internList: InternDetail[] = [];
    searchKeyword: string = '';
    isFetching = false;
    isDeleting = false;
    isDialog = false;
    totalRecords = 0;
    projectForm: {
        name: string;
        interns: InternDetail[];
    } = {
        name: '',
        interns: [],
    };
    curProject?: Project;
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
        this.fetchInterns();
    }

    fetchInterns() {
        this.internService.getInternList().subscribe({
            next: (res) => {
                this.internList = res.content;
            },
        });
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
        this.projectForm = {
            name: project.name,
            interns: [],
        };

        this.projectService
            .updateProject(project.id, {
                name: this.projectForm.name,
                interns: this.projectForm.interns.map((i) => i.id),
            })
            .subscribe({
                next: () => {
                    this.fetchProjects();
                    this.messageService.add({
                        severity: 'success',
                        detail: 'Update project successfully',
                    });
                    this.isDialog = true;
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        detail: 'Update project failed',
                    });
                },
            });
    }

    handleSubmit() {
        const source = this.curProject
            ? this.projectService.updateProject(this.curProject.id, {
                  name: this.projectForm.name,
                  interns: this.projectForm.interns.map((i) => i.id),
              })
            : this.projectService.createProject({
                  name: this.projectForm.name,
                  interns: this.projectForm.interns.map((i) => i.id),
              });
        source.subscribe(() => {
            this.fetchProjects();
            this.isDialog = false;
            this.curProject = undefined;
            this.messageService.add({
                severity: 'success',
                detail: this.curProject
                    ? 'Update'
                    : 'Add' + ' project successfully',
            });
        });
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
                        this.fetchProjects();
                        this.messageService.add({
                            severity: 'success',
                            detail: 'Delete project successfully',
                        });
                    },
                    error: () => {
                        this.isDeleting = false;
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Delete project failed',
                        });
                    },
                });
            },
        });
    }

    onAddProject() {
        this.curProject = undefined;
        this.projectForm = {
            name: '',
            interns: [],
        };
        this.isDialog = true;
    }

    onUpdateProject(project: Project) {
        this.curProject = { ...project };
        this.projectForm = {
            name: project.name,
            interns: project.interns,
        };
        this.isDialog = true;
    }
}
