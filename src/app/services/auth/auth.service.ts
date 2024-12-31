import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TokenModel } from 'src/app/models/auth/token-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private JWT_DATA_KEY = 'auth-data';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async getJwtData(): Promise<TokenModel | null> {
    return await this.storage.get(this.JWT_DATA_KEY);
  }

  async setJwtData(jwtData: TokenModel): Promise<void> {
    console.log(jwtData);
    await this.storage.set(this.JWT_DATA_KEY, jwtData);
  }

  async clearJwtData(): Promise<void> {
    await this.storage.remove(this.JWT_DATA_KEY);
  }
}
