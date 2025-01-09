import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteSurveyTwelveStepsPageRoutingModule } from './complete-survey-twelve-steps-routing.module';

import { CompleteSurveyTwelveStepsPage } from './complete-survey-twelve-steps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteSurveyTwelveStepsPageRoutingModule
  ],
  declarations: [CompleteSurveyTwelveStepsPage]
})
export class CompleteSurveyTwelveStepsPageModule {}
