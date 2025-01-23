import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-niko-niko-survey',
  templateUrl: './niko-niko-survey.component.html',
  styleUrls: ['./niko-niko-survey.component.scss'],
})
export class NikoNikoSurveyComponent  implements OnInit {

  selectedMood: string = '';
  feedback: string = '';

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

  sendNikoNikoForm() {
    this.popoverController.dismiss({
      mood: this.selectedMood,
      feedback: this.feedback
    });
  }

}
