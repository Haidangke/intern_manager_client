import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Intern, InternDetail } from '@features/intern/models/intern.model';
import { InternService } from '@features/intern/services/intern.service';
import { ColListData } from '@shared/components/list-data/list-data.model';
import { PageInfo } from '@shared/model/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { switchMap } from 'rxjs';
import { ProjectDetail, ProjectInternDetail } from '../../models';
import { ProjectInternService, ProjectService } from '../../services';
import { ToastrService } from 'ngx-toastr';

interface InternListData<T> {
    data: T[];
    fetching: boolean;
    deleting: boolean;
    totalRecords: number;
}

interface ProjectData {
    data?: ProjectDetail;
    fetching: boolean;
}

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class ProjectDetailComponent {
    constructor(
        private toastService: ToastrService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private internService: InternService,
        private projectService: ProjectService,
        private projectInternService: ProjectInternService
    ) {}

    projectInternList: InternListData<ProjectInternDetail> = {
        data: [],
        fetching: false,
        deleting: false,
        totalRecords: 0,
    };

    internsNotInProject: InternListData<InternDetail> = {
        data: [],
        fetching: false,
        deleting: false,
        totalRecords: 0,
    };

    selectedInterns: string[] = [];

    project: ProjectData = {
        data: undefined,
        fetching: false,
    };

    creating = false;

    isDialog = false;

    ref!: DynamicDialogRef;

    pagination: PageInfo = {
        page: 0,
        size: 10,
    };

    cols: ColListData[] = [
        {
            field: 'intern',
            type: 'child',
            child: {
                field: 'name',
                url: ['interns', 'id'],
            },
        },
        {
            header: 'email',
            field: 'intern',
            type: 'child',
            child: {
                field: 'email',
            },
        },
        {
            header: 'status',
            field: 'intern',
            type: 'child',
            child: {
                field: 'status',
            },
        },
        {
            header: 'mentor',
            field: 'intern',
            type: 'child',
            child: {
                field: 'mentor',
                type: 'child',
                child: {
                    field: 'name',
                    url: ['mentors', 'id'],
                },
            },
        },
        {
            header: 'team',
            field: 'intern',
            type: 'child',
            child: {
                field: 'team',
                type: 'child',
                child: {
                    field: 'name',
                    url: ['teams', 'id'],
                },
            },
        },
    ];

    ngOnInit() {
        this.fetchProject();
        this.fetchInternList();
        this.fetchInternListNotInProject();
    }

    fetchProject() {
        this.activatedRoute.params
            .pipe(
                switchMap((params) => {
                    const projectId = params['id'];
                    return this.projectService.getProject(projectId);
                })
            )
            .subscribe({
                next: (res) => {
                    this.project.data = res;
                    this.project.fetching = false;
                },
                error: () => {
                    this.project.fetching = false;
                },
            });
    }

    fetchInternList() {
        this.projectInternList.fetching = true;
        this.activatedRoute.params
            .pipe(
                switchMap((params) => {
                    const projectId = params['id'];
                    return this.projectInternService.getListProjectIntern(
                        projectId
                    );
                })
            )
            .subscribe({
                next: (res) => {
                    this.projectInternList.data = res.content;
                    this.projectInternList.totalRecords = res.totalElements;
                    this.projectInternList.fetching = false;
                },
                error: () => {
                    this.projectInternList.fetching = false;
                },
            });
    }

    fetchInternListNotInProject() {
        this.activatedRoute.params
            .pipe(
                switchMap((params) => {
                    const projectId = params['id'];
                    return this.internService.getInternListNotInProject(
                        projectId
                    );
                })
            )
            .subscribe({
                next: (res) => {
                    this.internsNotInProject.fetching = false;
                    this.internsNotInProject.data = res.content;
                },
                error: () => {
                    this.internsNotInProject.fetching = false;
                },
            });
    }

    handleAddInternFromProject() {
        if (!this.project.data) return;

        this.creating = true;

        this.projectInternService
            .addInternFromProject({
                project: this.project.data.id,
                interns: this.selectedInterns,
            })
            .subscribe({
                next: (res) => {
                    this.creating = false;
                    this.projectInternList.data = [
                        ...res,
                        ...this.projectInternList.data,
                    ];
                    this.projectInternList.totalRecords += res.length;

                    this.internsNotInProject.data = [
                        ...this.internsNotInProject.data,
                    ].filter(
                        (item) => !res.map((x) => x.intern.id).includes(item.id)
                    );

                    this.toastService.success(
                        `Add intern from project ${this.project.data?.name} successfully`
                    );
                },
                error: (error) => {
                    console.log(error);
                    this.creating = false;
                },
            });
    }

    handleDeleteInternFromProject(projectIntern: ProjectInternDetail) {
        const { intern, project, id } = projectIntern;
        this.confirmationService.confirm({
            header: 'Delete Intern From Project',
            message: `Are you sure that you want to delete "${intern.name}" from "${project.name}" ?`,
            icon: 'pi pi-exclamation-triangle',

            accept: () => {
                this.projectInternList.deleting = true;
                this.projectInternService
                    .deleteInternFromProject(id)
                    .subscribe({
                        next: () => {
                            this.projectInternList.deleting = false;
                            this.projectInternList.data = [
                                ...this.projectInternList.data,
                            ].filter((item) => item.id !== id);
                            this.projectInternList.totalRecords--;

                            this.internsNotInProject.data.push(intern);

                            this.toastService.success(
                                `Intern ${intern.name} has been removed from project ${project.name}`
                            );
                        },
                        error: (error) => {
                            this.projectInternList.deleting = false;

                            this.toastService.error(
                                `Intern ${intern.name} could not be deleted! from project ${project.name}`
                            );
                        },
                    });
            },
        });
    }
}
