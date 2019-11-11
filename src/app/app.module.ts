import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { GetEventsService } from './get-events.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FullCalendarModule, // import the FullCalendar module! will make the FullCalendar component available
    HttpClientModule
  ],
  providers: [GetEventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
