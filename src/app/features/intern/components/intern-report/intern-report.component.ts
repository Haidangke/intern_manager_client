import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-intern-report',
    templateUrl: './intern-report.component.html',
    styleUrls: ['./intern-report.component.scss'],
})
export class InternReportComponent implements OnInit {
    @ViewChild('calendar') calendar!: FullCalendarComponent;
    isDialog = false;
    events?: EventSourceInput;
    calendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
        editable: true,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        eventClick: this.handleEventClick,
        dateClick: this.handleDateClick,
    };
    internId = '';
    taskForm = {
        start: undefined,
        end: undefined,
        title: '',
    };
    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.route.params
            .pipe(
                switchMap((params: Params) => {
                    const id = params['id'];
                    this.internId = id;
                    return this.http.get('tasks', {
                        params: {
                            intern: id,
                        },
                    });
                })
            )
            .subscribe({
                next: (response: any) => {
                    console.log(response);
                    this.events = response.content?.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        start: item.start_date,
                        end: item.end_date,
                    }));
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        detail: 'Get task list failed',
                    });
                },
            });
    }

    onAddTask() {
        this.isDialog = true;
        this.createTask();
    }

    createTask() {
        const data = {
            start_date: this.taskForm.start,
            end_date: this.taskForm.end,
            title: this.taskForm.title,
            intern: this.internId,
        };
        this.http.post('tasks', data).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    detail: 'Create task successfully',
                });
                this.fetchTasks();
                this.taskForm = {
                    start: undefined,
                    end: undefined,
                    title: '',
                };
                this.isDialog = false;
            },
        });
    }

    fetchTasks() {
        this.http
            .get('http://localhost:8080/api/v1/tasks', {
                params: {
                    intern: this.internId,
                },
            })
            .subscribe({
                next: (response: any) => {
                    this.events = response.content?.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        start: item.start_date,
                        end: item.end_date,
                    }));
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        detail: 'Get task list failed',
                    });
                },
            });
    }

    handleEventClick($event: any) {}

    handleDateClick($event: any) {
        console.log($event);
    }
}
