import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-container',
  templateUrl: './option-container.component.html',
  styleUrls: ['./option-container.component.scss'],
})
export class OptionContainerComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  selectedOption: string | undefined;

  guardarSeleccion() {
    if (this.selectedOption) {
      console.log('Opción seleccionada:', this.selectedOption);
      // Aquí puedes agregar la lógica para guardar la opción seleccionada
    } else {
      console.log('No se ha seleccionado ninguna opción');
    }
  }

}
