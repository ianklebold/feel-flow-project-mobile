import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { SurveysService } from '../surveys/surveys.service';
import { UserProfileData } from 'src/app/models/user/user-profile-data';
import { UserUpdateData } from 'src/app/models/user/user-profile-data-update';
import { ResponseApi } from 'src/app/models/response/response-api.model';


const API_VERSION = environment.v1;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor( private apiService: ApiService, private surveyService: SurveysService) {}


  public saveImage( file: File): Promise<ResponseApi> {

    return this.apiService.post_with_request_param(`images/user/current_user`, file, API_VERSION).then((response: ResponseApi) => {

      return response;

    });
    
  }




}
