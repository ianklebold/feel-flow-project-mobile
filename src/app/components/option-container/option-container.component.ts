import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-option-container',
  templateUrl: './option-container.component.html',
  styleUrls: ['./option-container.component.scss'],
})
export class OptionContainerComponent  implements OnInit {

  @Input()
  answers: Array<string> | undefined;
  @Output() 
  optionSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  selectedOption: string | undefined;

  onOptionChange() {
    this.optionSelected.emit(this.selectedOption);
  }

  guardarSeleccion() {
    if (this.selectedOption) {
      console.log('Opción seleccionada:', this.selectedOption);
      // Aquí puedes agregar la lógica para guardar la opción seleccionada
    } else {
      console.log('No se ha seleccionado ninguna opción');
    }
  }

}
