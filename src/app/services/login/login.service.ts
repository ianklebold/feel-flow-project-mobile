import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthData } from 'src/app/models/auth/auth-data';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private apiService: ApiService) {

  }

  login( data : AuthData ){

    return this.apiService.autheticate(data);

  }

}
