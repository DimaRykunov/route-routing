import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AgmDirectionModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'your_key',
      libraries: ['places']
    })
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
