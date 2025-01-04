import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserData } from 'src/app/models/user/user-data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss'],
})
export class ProfileHomeComponent  implements OnInit{

  tokenDecoded :any;
  userData: UserData | undefined;

  constructor(private authService: AuthService, private homeService: HomeService) {}

  ngOnInit() {
    this.initialize();
  }
  
  private async initialize() {
    this.tokenDecoded = await this.authService.getDecodeToken(); // Espera el valor decodificado
    if (this.tokenDecoded) {
      this.getUserData();
    } else {
      console.error('Token no encontrado o no válido');
    }
  }

  public getUserData(): Promise<UserData> {
    return this.homeService.getUserData(this.tokenDecoded['id']).then((response: UserData) => {
      this.userData = response;
      return response;
    });
  }
  
  public getMessageNotSurveysExists() : string {
    return 'No tiene encuestas registradas.';
  }

}
