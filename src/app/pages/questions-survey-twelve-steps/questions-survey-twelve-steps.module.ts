import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionsSurveyTwelveStepsPageRoutingModule } from './questions-survey-twelve-steps-routing.module';

import { QuestionsSurveyTwelveStepsPage } from './questions-survey-twelve-steps.page';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionsSurveyTwelveStepsPageRoutingModule,
    ComponentsModule
],
  declarations: [QuestionsSurveyTwelveStepsPage]
})
export class QuestionsSurveyTwelveStepsPageModule {}
