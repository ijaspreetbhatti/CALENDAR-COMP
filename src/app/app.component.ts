import { Component, ViewChild, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { formatDate } from '@fullcalendar/core';
import { GetEventsService } from './get-events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private getService: GetEventsService) {
  }

  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin];
  calendarWeekends = false;
  calendarEvents: any = [];
  idCount: number;
  crId: any;
  crTitle: any;
  crDate: any;
  dispDate: any;

  ngOnInit(): void {
    let subscription = this.getService.getEvents().subscribe(
      (events) => {
        this.calendarEvents = events;
        this.calendarEvents.forEach(obj => {
          this.idCount = obj.id;
          console.log(this.idCount);
        });
      });
  }

  // Add Click Handler
  handleDateClick(arg: any) {
    this.crDate = arg.date;
    this.dispDate = formatDate(arg.date, {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'IST',
      locale: 'in'
    });
    document.getElementById('addEvent').click();
  }

  // Delete Click Handler
  handleEventClick(arg: any) {
    this.crId = arg.event.id;
    this.crTitle = arg.event.title;
    this.crDate = arg.event.date;
    document.getElementById('deleteEvent').click();
  }

  // Adds Event to the List
  addEvent() {
    this.calendarEvents = this.calendarEvents.concat({
      id: ++this.idCount,
      title: this.crTitle,
      start: this.crDate
    });
    this.getService.saveEvent({"title":this.crTitle, "start": this.crDate});
    console.log(this.calendarEvents);
    document.getElementById('closeModal').click();
  }

  // Deletes Event from the List 
  deleteEvent() {
    this.calendarEvents.forEach(obj => {
      if (obj.id == this.crId) {
        this.calendarEvents.splice(this.calendarEvents.indexOf(obj), 1);
        this.getService.deleteEvent(obj.id);
      }
      console.log(this.calendarEvents);
    });
    document.getElementById('closeDelete').click();
  }

}
