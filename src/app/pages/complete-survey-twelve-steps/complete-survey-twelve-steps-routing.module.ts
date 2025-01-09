import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteSurveyTwelveStepsPage } from './complete-survey-twelve-steps.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteSurveyTwelveStepsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteSurveyTwelveStepsPageRoutingModule {}
