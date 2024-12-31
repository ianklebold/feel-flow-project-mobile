import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-exit-button',
  templateUrl: './exit-button.component.html',
  styleUrls: ['./exit-button.component.scss'],
})
export class ExitButtonComponent  implements OnInit {

  constructor(private authService: AuthService, private navController: NavController) { }

  ngOnInit() {}

  async onLogout() {
    await this.authService.logout();
    this.navController.navigateRoot('login');
  }

}
