import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ShowCalendario = false

  title = 'cronograma';

  mostrarCalendario:boolean = false

  ExtenderCalendario(){

    if(this.mostrarCalendario == true){
      alert('Calendário já foi extendido')
    }else{
      this.mostrarCalendario = true
      alert('Calendário Extendido')
    }

    
  }
}
