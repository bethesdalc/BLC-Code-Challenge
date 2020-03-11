import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { SharedModule } from '../shared/shared.module';
import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
  declarations: [
    WelcomeComponent,
  ],
  imports: [
    SharedModule,
    WelcomeRoutingModule
  ]
})

export class WelcomeModule { }