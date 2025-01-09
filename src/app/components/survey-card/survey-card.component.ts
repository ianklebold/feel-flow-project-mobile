import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyTwelveSteps } from 'src/app/models/survey/twelve-steps/survey-twelve-steps-model';

@Component({
  selector: 'app-survey-card',
  templateUrl: './survey-card.component.html',
  styleUrls: ['./survey-card.component.scss'],
})
export class SurveyCardComponent  implements OnInit {

  @Input()
  survey: SurveyTwelveSteps | undefined;

  iconModuleName: string = '';
  stateSurvey: string = '';
  iconSurveyName: string = '';

  teamLeaderName: string | undefined;
  moduleName: string | undefined;

  creationDateSurvey: Date| undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.setSurveyData();
  }

  private setSurveyData(){

    if(this.survey?.module.moduleState === 'FINISHED'){
      this.stateSurvey = 'Encuesta cerrada';
      this.iconSurveyName = 'checkmark-done-circle';
    }else{
      if(this.survey?.surveyState === 'ACTIVE'){
        this.stateSurvey = 'Encuesta activada';
        this.iconSurveyName = 'alert-circle';
      }else if(this.survey?.surveyState === 'FINISHED'){
        this.stateSurvey = 'Encuesta terminada';
        this.iconSurveyName = 'checkmark-circle';
      }
    }

    if(this.survey?.module.name === 'TWELVE_STEPS'){
      this.iconModuleName = 'footsteps';
      this.moduleName = '12 Pasos de la felicidad';
    }else{
      this.iconModuleName = 'happy';
    }

    this.teamLeaderName = this.survey?.module?.team?.teamLeaderDTO?.name;
    this.creationDateSurvey = this.survey?.module.creationDate;

  }

  public playSurveys(){
    this.router.navigate(['/complete-survey-twelve-steps']);
  }

}
