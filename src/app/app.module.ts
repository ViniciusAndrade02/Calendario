import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { IntroducaoComponent } from './components/introducao/introducao.component';
import { Calendario2Component } from './components/calendario2/calendario2.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarioComponent,
    IntroducaoComponent,
    Calendario2Component,
  ],
  imports: [
    BrowserModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
