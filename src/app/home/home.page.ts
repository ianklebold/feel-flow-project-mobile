import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  
  public getMessageNotSurveysExists() : string {
    return 'No tiene encuestas registradas.';
  }
  

}
