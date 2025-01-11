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
import { QuestionContainerComponent } from './question-container/question-container.component';
import { OptionContainerComponent } from './option-container/option-container.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfileHomeComponent,
    NotifyButtonComponent,
    SurveyCardComponent,
    InfoCardComponent,
    RecommendationCardComponent,
    TabsComponent, 
    ErrorMessageComponent,
    ExitButtonComponent,
    QuestionContainerComponent,
    OptionContainerComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    ProfileHomeComponent,
    NotifyButtonComponent,
    SurveyCardComponent,
    InfoCardComponent,
    RecommendationCardComponent,
    TabsComponent,
    ErrorMessageComponent,
    ExitButtonComponent,
    QuestionContainerComponent,
    OptionContainerComponent
  ]
})
export class ComponentsModule { }
