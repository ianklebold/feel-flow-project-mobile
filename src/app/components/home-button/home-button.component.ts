import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.scss'],
})
export class HomeButtonComponent  implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {}

  async onHome() {
    this.navController.navigateRoot('home');
  }


}
