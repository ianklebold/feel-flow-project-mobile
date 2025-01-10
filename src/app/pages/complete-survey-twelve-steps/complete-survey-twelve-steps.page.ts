import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SurveyTwelveSteps } from 'src/app/models/survey/twelve-steps/survey-twelve-steps-model';
import { SurveysService } from 'src/app/services/surveys/surveys.service';

@Component({
  selector: 'app-complete-survey-twelve-steps',
  templateUrl: './complete-survey-twelve-steps.page.html',
  styleUrls: ['./complete-survey-twelve-steps.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CompleteSurveyTwelveStepsPage implements OnInit {

  showIcon = false;

  private suscription: Subscription | undefined;

  private surveyTwelveStepsActive: SurveyTwelveSteps | undefined;

  constructor(private surveyService: SurveysService) { }

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
    }, 2000); // Cambia cada 2 segundos
  }

}
