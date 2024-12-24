import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private JWT_KEY = 'jwt';

  constructor(private storage: Storage) {}

  async getToken(): Promise<string | null> {
    return await this.storage.getItem(this.JWT_KEY);
  }

  async setToken(token: string): Promise<void> {
    await this.storage.setItem(this.JWT_KEY, token);
  }

  async clearToken(): Promise<void> {
    await this.storage.removeItem(this.JWT_KEY);
  }
}
