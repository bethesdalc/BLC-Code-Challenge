import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { DataService } from './InMemoryDbService/data.service';

import { HttpClientModule } from '@angular/common/http';
import { EmployeeModule } from './employee/employee.module';
import { WelcomeModule } from './home/welcome.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    InMemoryWebApiModule.forRoot(DataService),
    HttpClientModule,
    EmployeeModule,
    WelcomeModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
