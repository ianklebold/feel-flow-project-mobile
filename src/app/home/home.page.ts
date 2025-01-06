import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home/home.service';
import { SurveyTwelveSteps } from '../models/survey/twelve-steps/survey-twelve-steps-model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  lastSurveyAvailable: SurveyTwelveSteps | undefined;
  surveys: Array<SurveyTwelveSteps> | undefined;
  surveyAvailable: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.setLastSurvey();
  }
  
  public getMessageNotSurveysExists() : string {
    return 'No tiene encuestas registradas.';
  }

  private setLastSurvey(){
    this.homeService.getLastSurvey().then((response: SurveyTwelveSteps) => {
      if(response){
        this.surveyAvailable = true;
        this.lastSurveyAvailable = response;
      }else{
        this.surveyAvailable = false;
        this.lastSurveyAvailable = undefined;
      }
    });
  }
  

}
