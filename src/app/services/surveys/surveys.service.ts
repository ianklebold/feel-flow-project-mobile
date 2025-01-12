import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { SurveyTwelveSteps } from 'src/app/models/survey/twelve-steps/survey-twelve-steps-model';
import { BehaviorSubject } from 'rxjs';
import { SurveyCompleteTwelveSteps } from 'src/app/models/survey/twelve-steps/survey-twelve-steps-complete-model';
import { ResponseCompleteSurvey } from 'src/app/models/survey/twelve-steps/response-complete-survey.model';


const API_VERSION = environment.v1;

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor( private apiService: ApiService) {}

  private surveyActiveDataBehavior = new BehaviorSubject<SurveyTwelveSteps>(this.getInitialValueForTwelveStepsSurvey());

  surveyActiveDataBehaviorObservable = this.surveyActiveDataBehavior.asObservable();

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

  public getQuestionsOfActiveSurvey(nameModule :string): Promise<Array<string>>{

    return this.apiService.get(`questions_and_answers/questions/${nameModule}`, API_VERSION).then((response:Array<any>) => {
      return response;
    });

  }

  public getAnswersOfActiveSurvey(nameModule :string): Promise<Array<Array<string>>>{

    return this.apiService.get(`questions_and_answers/answers/${nameModule}`, API_VERSION).then((response:Array<Array<string>>) => {
      return response;
    });

  }

  public completeSurvey(surveyCompleted :SurveyCompleteTwelveSteps): Promise<ResponseCompleteSurvey>{

    return this.apiService.post(`surveys/twelve_steps_module`,surveyCompleted, API_VERSION).then((response:ResponseCompleteSurvey) => {
      return response;
    });

  }

  public updateTwelveStepsDataBehavior(data: SurveyTwelveSteps){
    this.surveyActiveDataBehavior.next(data);
  }


  private getInitialValueForTwelveStepsSurvey():SurveyTwelveSteps{
    return {
      idSurvey: 0, // Valor inicial
      surveyState: '',
      regularUser: {
          uuid: '',
          name: '',
          surname: '',
          username: '',
          password: '',
          teamDTO: null
      },
      activityList: [],
      module: {
          name: '',
          creationDate: new Date(),
          moduleState: '',
          team: {
              uuid: '',
              nameTeam: '',
              descriptionTeam: '',
              teamLeaderDTO: {
                  uuid: '',
                  name: '',
                  surname: '',
                  username: '',
                  password: '',
                  teamDTO: null
              }
          }
      }
    };
  }

}
