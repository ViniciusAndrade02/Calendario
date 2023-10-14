import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {
  DataNumero!: number;
  mostrarDiv = true;
  element!: HTMLElement;
  texto: string = '';
  paragrafo: HTMLElement | null = null;
  ModoEditar: boolean = false
  horario: HTMLElement | null = null;
  HrsSelect!: string;

  //Select Event Horas


  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.element = this.el.nativeElement.querySelector('#nav') as HTMLElement;
  }

  ngOnInit() {
    
    const elementosBloco = this.el.nativeElement.querySelectorAll('.bloco');
    elementosBloco.forEach((elemento: HTMLElement) => {
      elemento.addEventListener('click', () => {
        this.paragrafo = elemento.querySelector('p');
        this.horario = elemento.querySelector('h6')
        const data = elemento.querySelector('h2');

        // Data
        console.log(data?.textContent);
        this.DataNumero = Number(data?.textContent);

        // Nav bar aparece e desaparecer
        this.mostrarDiv = false;
        this.element.classList.toggle('esconder');

        //horario
        console.log(this.horario?.textContent)

        // Atualizar texto
        this.atualizarTexto();
        this.editar()

        //se tiver vazio o paragrafo não precisará editar o texto
        if(this.paragrafo?.textContent == ''){
          this.ModoEditar = true
        }else{ 
          //se paragrafo tiver algo vai precisar editar
          this.ModoEditar = false
        }
      });
    });
  }

  //Botao Salvar
  salvar() {

    if (this.paragrafo){
      this.paragrafo.textContent = this.texto
    }

    if (this.horario) {
      this.horario.textContent = this.HrsSelect;
    }

    this.mostrarDiv = true;

  }

  //Texto do Input
  atualizarTexto() {
    if (this.paragrafo) {

      if(this.ModoEditar == false){
        this.texto = this.paragrafo.textContent || '';
      }else{
        this.texto = this.texto
      }

      
    }
  }

  //Botao Editar
  editar(){
    this.ModoEditar = !this.ModoEditar
  }

  //EEvento Select Horas
  HrsEvent(event: Event) {
    this.HrsSelect = (event.target as HTMLSelectElement).value;
    this.HrsSelect

  }
  //Excluir a anotação:
  excluir(){
    // Apagar o texto
    if (this.paragrafo){
      this.paragrafo.textContent = ""
    }

    // Apagar o horário
    if (this.horario) {
      this.horario.textContent = "";
    }

    this.mostrarDiv = true;
  }
}
