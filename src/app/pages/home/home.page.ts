import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { SurveyTwelveSteps } from '../../models/survey/twelve-steps/survey-twelve-steps-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  lastSurveyAvailable: SurveyTwelveSteps | undefined;
  surveys: Array<SurveyTwelveSteps> | undefined;
  surveyAvailable: boolean = false;

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {
    this.setLastSurvey(); // Llama a tu método para cargar los datos
  }

  ionViewWillEnter() {
    this.setLastSurvey(); // Llama a tu método para cargar los datos
  }
  
  public getMessageNotSurveysExists() : string {
    return 'No tiene encuestas activas.';
  }

  private setLastSurvey(){
    this.homeService.getLastSurvey().then((response: SurveyTwelveSteps) => {
      if(response){
        this.surveyAvailable = this.isSurveyActiveByDate(response.surveyState, response.isAfterTheDateOfPublic, response.isBeforeTheDateOfClose);
        this.lastSurveyAvailable = response;
      }else{
        this.surveyAvailable = false;
        this.lastSurveyAvailable = undefined;
      }
    });
  }

  goToSurveys() {
    this.router.navigate(['/surveys']);
  }

  private isSurveyActiveByDate(state:string, isAfterTheDateOfPublic: boolean, isBeforeTheDateOfClose:boolean): boolean{

    if(state === 'ACTIVE'){
      return isAfterTheDateOfPublic && isBeforeTheDateOfClose;
    }

    return true;
  }
  

}
