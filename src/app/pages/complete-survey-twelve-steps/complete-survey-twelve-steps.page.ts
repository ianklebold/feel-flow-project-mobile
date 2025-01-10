import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SurveyTwelveSteps } from 'src/app/models/survey/twelve-steps/survey-twelve-steps-model';
import { SurveysService } from 'src/app/services/surveys/surveys.service';

@Component({
  selector: 'app-complete-survey-twelve-steps',
  templateUrl: './complete-survey-twelve-steps.page.html',
  styleUrls: ['./complete-survey-twelve-steps.page.scss'],
})
export class CompleteSurveyTwelveStepsPage implements OnInit {

  private suscription: Subscription | undefined;

  private surveyTwelveStepsActive: SurveyTwelveSteps | undefined;

  constructor(private surveyService: SurveysService) { }

  ngOnInit() {
    this.suscription = this.surveyService.surveyActiveDataBehaviorObservable.subscribe(
      value => {
        this.surveyTwelveStepsActive = value;
      }
    );
    console.log(this.surveyTwelveStepsActive);
  }

}
