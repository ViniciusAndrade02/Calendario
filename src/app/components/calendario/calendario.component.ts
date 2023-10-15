import { Component, ElementRef,Output,EventEmitter } from '@angular/core';

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
  classCor: HTMLElement | null = null;
  ModoEditar: boolean = false
  horario: HTMLElement | null = null;
  HrsSelect!: string;
  CorSelect!: string;

  //ativar a extensao do calendario

  @Output() enviar: EventEmitter<any> = new EventEmitter()

  extender(){
    this.enviar.emit()
  }



  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.element = this.el.nativeElement.querySelector('#nav') as HTMLElement;
  }

  ngOnInit() {
    
    const elementosBloco = this.el.nativeElement.querySelectorAll('.bloco');
    elementosBloco.forEach((elemento: HTMLElement) => {
      elemento.addEventListener('click', () => {
        this.paragrafo = elemento.querySelector('p');
        this.horario = elemento.querySelector('h6');
        this.classCor = elemento.querySelector('.conteudo')
        const data = elemento.querySelector('h2');
        
        // Mostrar a Data
        this.DataNumero = Number(data?.textContent);
        //atualizar input correspondente 
        this.texto = this.paragrafo?.textContent || '';
        //atualizar horario correspondente 
        this.HrsSelect = this.horario?.textContent || '';
        //atualizar a cor
        this.CorSelect = this.classCor?.classList.value.replace('conteudo','').trim() || "";

        // Nav bar aparece e desaparecer
        this.mostrarDiv = false;
        this.element.classList.toggle('esconder');

        //horario
        console.log(this.horario?.textContent)

        // Atualizar texto
        this.atualizarTextos();
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

    //O que foi digitado ficar salvo no paragrafo
    if (this.paragrafo){
      this.paragrafo.textContent = this.texto
    }

    //Adicionar o horario do calendario
    if (this.horario) {
      this.horario.textContent = this.HrsSelect;
    }

    //Remover todos os classColor
    this.classCor?.classList.remove('roxo')
    this.classCor?.classList.remove('laranja')
    this.classCor?.classList.remove('amarelo')
    this.classCor?.classList.remove('azul')
    this.classCor?.classList.remove('branco')

    //Adicionar as cores de acordo com o usuário
    if(this.CorSelect == "roxo"){
      this.classCor?.classList.add('roxo')
    }else if(this.CorSelect == "laranja"){
      this.classCor?.classList.add('laranja')
    }else if(this.CorSelect == "amarelo"){
      this.classCor?.classList.add('amarelo')
    }else if(this.CorSelect == "azul"){
      this.classCor?.classList.add('azul')
    }else if(this.CorSelect == "branco"){
      this.classCor?.classList.add('branco')
    }

    //Desaparecer a NavBar
    this.mostrarDiv = true;

  }

  //Texto do Input
  atualizarTextos() {
    
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

  //Select COR
  CorEvent(event: Event) {
    this.CorSelect = (event.target as HTMLSelectElement).value;
    console.log(this.CorSelect)
  
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

    //Quando remover as class só ficará o branco
    this.classCor?.classList.remove('roxo')
    this.classCor?.classList.remove('laranja')
    this.classCor?.classList.remove('amarelo')
    this.classCor?.classList.remove('azul')
    this.classCor?.classList.add('branco')

    this.mostrarDiv = true;
  }
}
