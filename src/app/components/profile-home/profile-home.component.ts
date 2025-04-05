import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserData } from 'src/app/models/user/user-data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HomeService } from 'src/app/services/home/home.service';
import { WebSocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss'],
})
export class ProfileHomeComponent  implements OnInit{

  tokenDecoded :any;
  userData: UserData | undefined;
  userImage: string | undefined;

  constructor(private authService: AuthService, private homeService: HomeService, private webSocketService:WebSocketService, private navController: NavController) {}

  ngOnInit() {
    this.initialize();
  }
  
  private async initialize() {
    this.tokenDecoded = await this.authService.getDecodeToken(); // Espera el valor decodificado
    if (this.tokenDecoded) {
      this.getUserData();
      this.getUserImage();
    } else {
      console.error('Token no encontrado o no válido');
    }
  }

  public getUserData(): Promise<UserData> {
    return this.homeService.getUserData(this.tokenDecoded['id']).then((response: UserData) => {
      this.userData = response;
      console.log(this.userData.enterpriseInfoHomeDTO.uuid);
      this.webSocketService.connect(this.userData.enterpriseInfoHomeDTO.uuid);
      return response;
    });
  }

  public getUserImage(): void {
    this.homeService.getUserImage().then((imageUrl: string) => {
      this.userImage = imageUrl;
    }).catch(error => {
      console.error('Error al cargar la imagen', error);
    });
  }
  
  public getMessageNotSurveysExists() : string {
    return 'No tiene encuestas registradas.';
  }

  public goToProfilePage(){
    this.navController.navigateRoot('profile');
  }

}
