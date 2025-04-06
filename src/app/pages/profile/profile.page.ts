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

    tokenDecoded :any;
    userData: UserProfileData | undefined;

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
        console.log(this.userData);
        return response;
      });
    }

}
