import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { SurveyTwelveSteps } from '../../models/survey/twelve-steps/survey-twelve-steps-model';
import { Router } from '@angular/router';
import { NikoNikoSurvey } from 'src/app/models/survey/niko-niko/survey-niko-niko-model';
import { PopoverController } from '@ionic/angular';
import { NikoNikoSurveyComponent } from 'src/app/components/niko-niko-survey/niko-niko-survey.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  lastSurveyAvailable: SurveyTwelveSteps | undefined;
  surveys: Array<SurveyTwelveSteps> | undefined;
  surveyAvailable: boolean = false;

  constructor(
    private homeService: HomeService, 
    private router: Router,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.setLastSurvey(); 
    this.getNikoNikoSurvey();
  }

  async ionViewWillEnter() {
    this.setLastSurvey(); 
    const nikoNikoSurveyResponse = await this.getNikoNikoSurvey();

    if (nikoNikoSurveyResponse) {
      this.presentPopover(nikoNikoSurveyResponse);
    }
  }
  
  public getMessageNotSurveysExists() : string {
    return 'No tiene encuestas de 12 pasos de la felicidad activas';
  }

  async presentPopover(response: NikoNikoSurvey) {
    const popover = await this.popoverController.create({
      component: NikoNikoSurveyComponent,
      cssClass: 'popover-example-class',
      translucent: true,
      componentProps: { surveyData: response }
    });

    popover.onDidDismiss().then((result) => {
      if (result.data) {
        const { mood, feedback } = result.data;
        response.activityAvailable.answer = mood;
        response.activityAvailable.descriptionFeeling = feedback;
        
        this.homeService.completeSurveyNikoNiko(response);

        console.log('Estado de ánimo:', mood);
        console.log('Comentario:', feedback);
      }
    });
  
    return await popover.present();
  }

  // private getNikoNikoSurvey(){
  //   this.homeService.getSurveyNikoNikoAvailable().then((response: NikoNikoSurvey) => {
  //     if(response){
  //       console.log("Result :", response);
  //       if( response.activityAvailable.answer == undefined || response.activityAvailable.answer == null  ){
  //         console.log("Lista para responder");
  //       }
  //     }else{
  //       console.log("No llego nada!");
  //     }
  //   });
  // }

  private async getNikoNikoSurvey(): Promise<NikoNikoSurvey | null> {
    try {
      const response: NikoNikoSurvey = await this.homeService.getSurveyNikoNikoAvailable();
      if (response && (response.activityAvailable.answer == undefined || response.activityAvailable.answer == null)) {
        console.log("Lista para responder");
        return response;
      } else {
        console.log("No hay encuesta disponible o ya ha sido respondida.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener la encuesta:", error);
      return null;
    }
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
