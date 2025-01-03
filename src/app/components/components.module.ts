import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { IonicModule } from '@ionic/angular';
import { NotifyButtonComponent } from './notify-button/notify-button.component';
import { SurveyCardComponent } from './survey-card/survey-card.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { RecommendationCardComponent } from './recommendation-card/recommendation-card.component';
import { TabsComponent } from './tabs/tabs.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ExitButtonComponent } from './exit-button/exit-button.component';



@NgModule({
  declarations: [
    ProfileHomeComponent,
    NotifyButtonComponent,
    SurveyCardComponent,
    InfoCardComponent,
    RecommendationCardComponent,
    TabsComponent, 
    ErrorMessageComponent,
    ExitButtonComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ProfileHomeComponent,
    NotifyButtonComponent,
    SurveyCardComponent,
    InfoCardComponent,
    RecommendationCardComponent,
    TabsComponent,
    ErrorMessageComponent,
    ExitButtonComponent
  ]
})
export class ComponentsModule { }
