import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NikoNikoSurvey } from 'src/app/models/survey/niko-niko/survey-niko-niko-model';

@Component({
  selector: 'app-niko-niko-survey',
  templateUrl: './niko-niko-survey.component.html',
  styleUrls: ['./niko-niko-survey.component.scss'],
})
export class NikoNikoSurveyComponent  implements OnInit {

  @Input() surveyData: NikoNikoSurvey | undefined;
  selectedMood!: string;
  feedback!: string;

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

  sendNikoNikoForm() {
    this.popoverController.dismiss({
      mood: this.selectedMood,
      feedback: this.feedback
    });
  }

}
