import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public getMessageKudosAvailable() : string {
    return 'Kudos disponible en los detalles de los miembros del equipo';
  }

}
