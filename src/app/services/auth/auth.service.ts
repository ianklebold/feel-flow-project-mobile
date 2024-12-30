import { Injectable } from '@angular/core';
import { AuthData } from 'src/app/models/auth/auth-data';
import { ApiService } from '../api/api.service';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private JWT_KEY = 'jwt';

  constructor(private storage: Storage) {}

  async getToken(): Promise<string | null> {
    return await this.storage.get(this.JWT_KEY);
  }



  async setToken(token: string): Promise<void> {
    await this.storage.set(this.JWT_KEY, token);
  }

  async clearToken(): Promise<void> {
    await this.storage.remove(this.JWT_KEY);
  }
}
