import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { ErrorConstants } from 'src/app/constants/error.message';
import { ResponseApi } from 'src/app/models/response/response-api.model';
import { UserProfileData } from 'src/app/models/user/user-profile-data';
import { UserUpdateData } from 'src/app/models/user/user-profile-data-update';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HomeService } from 'src/app/services/home/home.service';
import { ImageService } from 'src/app/services/image/image.service';
import { ProfileService } from 'src/app/services/profie-page/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  tokenDecoded: any;
  userUpdateData: UserUpdateData = {
    name: '',
    surname: '',
    username: '',
    country: '',
    phoneNumber: '',
    description: ''
  };
  userData: UserProfileData | undefined;
  userImage: string | undefined;
  loading = true;
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

  newProfileImage: File | null = null;
  newProfileImagePreview: string | null = null;

  @ViewChild(ErrorMessageComponent) errorMessageComponent!: ErrorMessageComponent;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private authService: AuthService, 
    private homeService: HomeService, 
    private profileService: ProfileService, 
    private imageService: ImageService,
    private navController: NavController) { }

  ngOnInit() {
    this.initialize();
  }
  
  private async initialize() {
    this.tokenDecoded = await this.authService.getDecodeToken();
    if (this.tokenDecoded) {
      this.getUserData();
      this.getUserImage();
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

  public toggleEdit(): void {
    this.editing = !this.editing;
    if (!this.editing && this.userData) {
      this.editableData = { ...this.userData };
      this.newProfileImage = null;
      this.newProfileImagePreview = null;
    }
  }

  public saveChanges(): void {

    if(this.newProfileImage != null && this.newProfileImagePreview != null){
      this.imageService.saveImage(this.newProfileImage).then(
        (value: ResponseApi) => {
          if(value.statusCode === '200'){
            this.getUserImage();
          }
        }
      ).catch(
        error => {
              if (error instanceof HttpErrorResponse) {
                this.errorMessageComponent.errorMessage = ErrorConstants.errorToSaveImage; 
                this.errorMessageComponent.showError();
              }
            }
      );
    }

    if (this.editableData) {
      this.userUpdateData = { 
        name: this.editableData.name,
        surname: this.editableData.surname,
        username: this.editableData.username,
        country: this.editableData.country,
        phoneNumber: this.editableData.phoneNumber,
        description: this.editableData.description
       };

      this.profileService.updateProfileData(this.userUpdateData, this.editableData.uuid).then(
        (value: boolean) => {
          if(value){
            if(this.editableData.username !== this.userData?.username){
              this.onLogout();
            }

            this.userData= {...this.editableData};
            this.editing = false;
          }

        }
      ).catch(
        error => {
          if (error instanceof HttpErrorResponse) {
            console.log(error);
            if(error.error instanceof Array){
              this.errorMessageComponent.errorMessage = this.errorMessageComponent.getFirstError(error.error); 
            }else{
              console.log(error.error['errorMessage']);
              this.errorMessageComponent.errorMessage = error.error['errorMessage']; 
            }
            this.errorMessageComponent.showError();
          }
        }
      )
    }
    this.newProfileImage = null;
    this.newProfileImagePreview = null;
  }

  public getUserImage(): void {
    this.homeService.getUserImage().then((imageUrl: string) => {
      this.userImage = imageUrl;
    }).catch(error => {
      // En caso de error, puedes asignar una imagen por defecto y cambiar loading a false
      this.userImage = 'assets/profile-photo/default.png';
      this.loading = false;
    });
  }

  public openFileChooser(): void {
    this.fileInput.nativeElement.click();
  }

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
    input.value = '';
  }

  onImgLoad() {
    this.loading = false;
  }

  async onLogout() {
    await this.authService.logout();
    this.navController.navigateRoot('login');
  }
}