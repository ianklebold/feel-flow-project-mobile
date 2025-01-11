import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SurveyTwelveSteps } from 'src/app/models/survey/twelve-steps/survey-twelve-steps-model';
import { SurveysService } from 'src/app/services/surveys/surveys.service';

@Component({
  selector: 'app-complete-survey-twelve-steps',
  templateUrl: './complete-survey-twelve-steps.page.html',
  styleUrls: ['./complete-survey-twelve-steps.page.scss']
})
export class CompleteSurveyTwelveStepsPage implements OnInit {

  showIcon = false;

  private suscription: Subscription | undefined;

  private surveyTwelveStepsActive: SurveyTwelveSteps | undefined;

  constructor(private router: Router, private surveyService: SurveysService) { }

  ngOnInit() {
    this.suscription = this.surveyService.surveyActiveDataBehaviorObservable.subscribe(
      value => {
        this.surveyTwelveStepsActive = value;
      }
    );
    this.startToggle();
  }

  startToggle() {
    setInterval(() => {
      this.showIcon = !this.showIcon;
    }, 2000);
  }

  toggleToHome(){
    this.router.navigate(['/home']);
  }

  toggleToQuestions(){
    this.router.navigate(['/questions-survey-twelve-steps']);
  }

}
