import { Injectable, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from 'jwt-decode';
import { TokenModel } from 'src/app/models/auth/token-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private JWT_DATA_KEY = 'auth-data';
  private tokenExpirationTimer: any;

  constructor(private storage: Storage, private navController: NavController) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.startTokenExpirationCheck();
  }

  async getJwtData(): Promise<TokenModel | null> {
    return await this.storage.get(this.JWT_DATA_KEY);
  }

  async setJwtData(jwtData: TokenModel): Promise<void> {
    await this.storage.set(this.JWT_DATA_KEY, jwtData);
  }

  async clearJwtData(): Promise<void> {
    await this.storage.remove(this.JWT_DATA_KEY);
  }

  async logout(): Promise<void> {
    await this.clearJwtData();
  }

  async logoutAndRedirect(): Promise<void> {
    await this.logout();
    this.navController.navigateRoot('login');
  }

  private startTokenExpirationCheck() {
    this.tokenExpirationTimer = setInterval(async () => {
      const jwtData: TokenModel = await this.storage.get(this.JWT_DATA_KEY);
      if (jwtData) {
        const expirationDate = this.getTokenExpirationDate(jwtData.token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime >= expirationDate) {
          // await this.logoutAndRedirect();
        }
        console.log(expirationDate);
      }
    }, 60000);
  }

  private getTokenExpirationDate(token: string): number {
    const decoded: any = jwtDecode(token);
    return decoded.exp;
  }

  public async getDecodeToken(){
    const jwtData: TokenModel = await this.storage.get(this.JWT_DATA_KEY);

    if(jwtData){
      const decoded: any = jwtDecode(jwtData.token);
      return decoded;
    }
    return null;
  }


}
