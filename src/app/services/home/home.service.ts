import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { UserData } from 'src/app/models/user/user-data';
import { SurveyTwelveSteps } from 'src/app/models/survey/twelve-steps/survey-twelve-steps-model';
import { NikoNikoSurvey } from 'src/app/models/survey/niko-niko/survey-niko-niko-model';
import { SurveysService } from '../surveys/surveys.service';
import { ImageDto } from 'src/app/models/images/image-dto';
import { UserProfileData } from 'src/app/models/user/user-profile-data';


const API_VERSION = environment.v1;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor( private apiService: ApiService, private surveyService: SurveysService) {}

  public completeSurveyNikoNiko(nikoNikoSurvey: NikoNikoSurvey){
    this.surveyService.completeSurveyNikoNiko(nikoNikoSurvey);
  }

  public getSurveyNikoNikoAvailable():Promise<NikoNikoSurvey>{

    return this.apiService.get('surveys/niko_niko_module',API_VERSION).then((response:any) => {
      return response as NikoNikoSurvey;
    });

  }

  public getLastSurvey(): Promise<SurveyTwelveSteps>{
    
    return this.apiService.get(`surveys/last`,API_VERSION).then((response:any) => {
      return response as SurveyTwelveSteps;
    });
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

  public getUserProfileData( idUser: string ): Promise<UserProfileData> {

    return this.apiService.get(`user/${idUser}`,API_VERSION).then((response:any) => {

      const userData = {
          uuid: idUser,
          name: response['name'],
          surname: response['surname'],
          username: response['username'],
          enterpriseInfoHomeDTO: {
            uuid: response['enterpriseInfoHomeDTO']['uuid'],
            name: response['enterpriseInfoHomeDTO']['name']
          },
          country: response['country'],
          phoneNumber: response['phoneNumber'],
          description: response['description']
      } 

      return userData;
      
    });
    
  }

  public getUserImage(): Promise<string> {
    return this.apiService.get(`images/user/current_user`,API_VERSION).then((response:ImageDto) => {
      // Si fileData ya viene como string base64, solo hay que armar la data URL
      return `data:${response.fileType};base64,${response.fileData}`;
    });
  }
}
