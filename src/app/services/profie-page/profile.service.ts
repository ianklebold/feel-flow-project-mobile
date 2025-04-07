import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { UserData } from 'src/app/models/user/user-data';
import { SurveyTwelveSteps } from 'src/app/models/survey/twelve-steps/survey-twelve-steps-model';
import { NikoNikoSurvey } from 'src/app/models/survey/niko-niko/survey-niko-niko-model';
import { SurveysService } from '../surveys/surveys.service';
import { ImageDto } from 'src/app/models/images/image-dto';
import { UserProfileData } from 'src/app/models/user/user-profile-data';
import { UserUpdateData } from 'src/app/models/user/user-profile-data-update';


const API_VERSION = environment.v1;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private apiService: ApiService, private surveyService: SurveysService) {}

  public updateProfileData( userUpdateData: UserUpdateData, idUser:string ): Promise<boolean> {

    return this.apiService.put(`user/${idUser}`, userUpdateData, API_VERSION).then((response: any) => {

      console.log("Respuesta ", response);
      if(response){
        return false;
      }
      return true;

    });
    
  }

}
