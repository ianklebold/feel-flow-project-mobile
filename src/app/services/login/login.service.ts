import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthData } from 'src/app/models/auth/auth-data';
import { ApiService } from '../api/api.service';
import { TokenModel } from 'src/app/models/auth/token-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private apiService: ApiService) {

  }

  login(data: AuthData): Promise<TokenModel> {
    return this.apiService.autheticate(data).then((response: any) => {
      const tokenData: TokenModel = {
          message: response.message,
          token: response.token,
          username: response.username
      };
      return tokenData;
  });
  }

}
