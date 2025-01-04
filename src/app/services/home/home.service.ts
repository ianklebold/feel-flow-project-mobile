import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TokenModel } from 'src/app/models/auth/token-model';
import { environment } from 'src/environments/environment';
import { UserData } from 'src/app/models/user/user-data';


const API_VERSION = environment.v1;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor( private apiService: ApiService) {

  }

  public getUserData( idUser: string ): Promise<UserData> {

    return this.apiService.get(`user/${idUser}`,API_VERSION).then((response:any) => {

      const userData = {
          uuid: idUser,
          name: response['name'],
          surname: response['surname'],
          username: response['username'],
          enterpriseInfoHomeDTO: {
            uuid: response['enterpriseInfoHomeDTO']['uuid'],
            name: response['enterpriseInfoHomeDTO']['name']
          }
      } 

      return userData;
      
    });
    
  }

}
