import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { IonicModule } from '@ionic/angular';
import { NotifyButtonComponent } from './notify-button/notify-button.component';
import { SurveyCardComponent } from './survey-card/survey-card.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { RecommendationCardComponent } from './recommendation-card/recommendation-card.component';



@NgModule({
  declarations: [ProfileHomeComponent,NotifyButtonComponent,SurveyCardComponent,InfoCardComponent,RecommendationCardComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ProfileHomeComponent,
    NotifyButtonComponent,
    SurveyCardComponent,
    InfoCardComponent,
    RecommendationCardComponent
  ]
})
export class ComponentsModule { }
