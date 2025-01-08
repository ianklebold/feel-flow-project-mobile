import { Component, OnInit } from '@angular/core';
import { SurveyTwelveSteps } from 'src/app/models/survey/twelve-steps/survey-twelve-steps-model';
import { SurveysService } from 'src/app/services/surveys/surveys.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.page.html',
  styleUrls: ['./surveys.page.scss'],
})
export class SurveysPage implements OnInit {

  constructor(private surveysService: SurveysService) { }


  surveysList:Array<SurveyTwelveSteps> | undefined;

  ngOnInit() {
    this.setAllSurveys();
  }

  private setAllSurveys(): void{

    this.surveysService.getAllSurveys('','','').then( (response: Array<SurveyTwelveSteps>) =>
      this.surveysList = response
    );

  }

}
