import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { SurveyTwelveSteps } from 'src/app/models/survey/twelve-steps/survey-twelve-steps-model';


const API_VERSION = environment.v1;

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor( private apiService: ApiService) {}

  public getAllSurveys(surveyState:string,creationDate:string,moduleName:string): Promise<Array<SurveyTwelveSteps>>{
    
    const params:Array<any> = [
      {
        key: 'surveyState',
        value: 'ACTIVE'
      }
      // ,
      // {
      //   key: 'creationDate',
      //   value: null
      // }
      ,
      {
        key: 'moduleName',
        value: 'TWELVE_STEPS'
      },
    ]

    return this.apiService.get(`surveys/filter`, API_VERSION, params).then((response:Array<any>) => {
      
      return response.map( (survey:any) =>  survey as SurveyTwelveSteps);

    });

  }

}
