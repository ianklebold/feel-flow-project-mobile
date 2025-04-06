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

  public toggleEdit(): void {
    this.editing = !this.editing;
    if (!this.editing && this.userData) {
      this.editableData = { ...this.userData };
      this.newProfileImage = null;
      this.newProfileImagePreview = null;
    }
  }

  public saveChanges(): void {
    if (this.editableData) {
      this.userData = { ...this.editableData };
      this.editing = false;
      console.log('Datos guardados', this.userData);
      this.newProfileImage = null;
      this.newProfileImagePreview = null;
    }
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
}