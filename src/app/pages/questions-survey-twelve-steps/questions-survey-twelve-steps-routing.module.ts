import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsSurveyTwelveStepsPage } from './questions-survey-twelve-steps.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionsSurveyTwelveStepsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsSurveyTwelveStepsPageRoutingModule {}
