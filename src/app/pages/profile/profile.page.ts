import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  // Variables para la nueva imagen
  newProfileImage: File | null = null;
  newProfileImagePreview: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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
      this.editableData = { ...response };
      return response;
    });
  }

  // Alterna el modo edición; si se cancela, restaura la data original y descarta cambios en la imagen.
  public toggleEdit(): void {
    this.editing = !this.editing;
    if (!this.editing && this.userData) {
      this.editableData = { ...this.userData };
      // Descarta cambios en la imagen si se cancela
      this.newProfileImage = null;
      this.newProfileImagePreview = null;
    }
  }

  // Guarda los cambios; la nueva imagen se guardará en otro objeto para ser enviado en otro endpoint.
  public saveChanges(): void {
    if (this.editableData) {
      this.userData = { ...this.editableData };
      this.editing = false;
      console.log('Datos guardados', this.userData);
      // Aquí podrías guardar newProfileImage en otra variable o enviarla a un endpoint.
      // Por ahora, descartamos el preview.
      this.newProfileImage = null;
      this.newProfileImagePreview = null;
    }
  }

  // Abre el selector de archivos (sólo en modo edición)
  public openFileChooser(): void {
    this.fileInput.nativeElement.click();
  }

  // Cuando se selecciona una nueva imagen, se genera un preview
  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.newProfileImage = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProfileImagePreview = e.target.result;
      };
      reader.readAsDataURL(this.newProfileImage);
    }
  }
}