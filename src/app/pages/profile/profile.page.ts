import { Component, OnInit } from '@angular/core';
import { UserProfileData } from 'src/app/models/user/user-profile-data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  tokenDecoded: any;
  userData: UserProfileData | undefined;
  // Objeto temporal para edición
  editableData: UserProfileData = {
    uuid: '',
    name: '',
    surname: '',
    username: '',
    enterpriseInfoHomeDTO: { uuid: '', name: '' },
    country: '',
    phoneNumber: '',
    description: ''
  };
  editing = false;

  constructor(private authService: AuthService, private homeService: HomeService) { }

  ngOnInit() {
    this.initialize();
  }
  
  private async initialize() {
    this.tokenDecoded = await this.authService.getDecodeToken();
    if (this.tokenDecoded) {
      this.getUserData();
    } else {
      console.error('Token no encontrado o no válido');
    }
  }

  public getUserData(): Promise<UserProfileData> {
    return this.homeService.getUserProfileData(this.tokenDecoded['id']).then((response: UserProfileData) => {
      this.userData = response;
      // Inicializa editableData con una copia de userData
      this.editableData = { ...response };
      return response;
    });
  }

  // Alterna el modo edición; si se cancela, se restaura la información original.
  public toggleEdit(): void {
    this.editing = !this.editing;
    if (!this.editing && this.userData) {
      // Se cancela la edición: restablece editableData a la data original
      this.editableData = { ...this.userData };
    }
  }

  // Al presionar "Guardar cambios", se actualiza userData y se desactiva el modo edición.
  public saveChanges(): void {
    if (this.editableData) {
      // Aquí llamarías a la API para actualizar el perfil, pero por ahora sólo actualizamos localmente
      this.userData = { ...this.editableData };
      this.editing = false;
      console.log('Datos guardados', this.userData);
    }
  }
}
