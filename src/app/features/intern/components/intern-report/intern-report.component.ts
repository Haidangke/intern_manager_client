import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
    selector: 'app-intern-report',
    templateUrl: './intern-report.component.html',
    styleUrls: ['./intern-report.component.scss'],
})
export class InternReportComponent implements OnInit {
    @ViewChild('calendar') calendar!: FullCalendarComponent;
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

    ngOnInit(): void {
        this.events = [
            {
                start: '2023-06-24',
                end: '2023-06-30',
                title: 'Learn Angular',
                groupId: '1',
            },
            {
                start: '2023-06-24',
                end: '2023-06-30',
                title: 'Learn Spring Boot',
                groupId: '1',
                backgroundColor: 'green',
                textColor: 'white',
                borderColor: 'green',
            },
        ];
    }

    handleEventClick($event: any) {
        console.log($event.event._def);
    }

    handleDateClick($event: any) {
        console.log($event);
    }
}
