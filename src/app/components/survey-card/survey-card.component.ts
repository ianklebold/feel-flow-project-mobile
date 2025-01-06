import { Component, Input, OnInit } from '@angular/core';
import { SurveyTwelveSteps } from 'src/app/models/survey/twelve-steps/survey-twelve-steps-model';

@Component({
  selector: 'app-survey-card',
  templateUrl: './survey-card.component.html',
  styleUrls: ['./survey-card.component.scss'],
})
export class SurveyCardComponent  implements OnInit {

  @Input()
  survey: SurveyTwelveSteps | undefined;

  iconModuleName: string = '';
  stateSurvey: string = '';
  iconSurveyName: string = '';

  teamLeaderName: string | undefined;
  moduleName: string | undefined;

  creationDateSurvey: string| undefined;

  constructor() { }

  ngOnInit() {
    this.setSurveyData();
  }

  private setSurveyData(){

    if(this.survey?.module.moduleState === 'FINISHED'){
      this.stateSurvey = 'Encuesta cerrada';
      this.iconSurveyName = 'checkmark-done-circle';
    }else{
      if(this.survey?.surveyState === 'ACTIVE'){
        this.stateSurvey = 'Encuesta activada';
        this.iconSurveyName = 'alert-circle';
      }else if(this.survey?.surveyState === 'FINISHED'){
        this.stateSurvey = 'Encuesta terminada';
        this.iconSurveyName = 'checkmark-circle';
      }
    }

    if(this.survey?.module.name === 'TWELVE_STEPS'){
      this.iconModuleName = 'footsteps';
      this.moduleName = '12 Pasos de la felicidad';
    }else{
      this.iconModuleName = 'happy';
    }

    this.teamLeaderName = this.survey?.module?.team?.teamLeaderDTO?.name;
    this.creationDateSurvey = this.formatDate(this.survey?.module.creationDate);

  }

  public formatDate(inputDate: Date|undefined): string {
    if( inputDate ){
    // Convertir la cadena de fecha a un objeto Date
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Formatear las fechas
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    
    // Comprobar si la fecha es hoy
    if (inputDate.toDateString() === today.toDateString()) {
        return 'hoy';
    }

    // Comprobar si la fecha es ayer
    if (inputDate.toDateString() === yesterday.toDateString()) {
        return 'ayer';
    }

    // Comprobar si la fecha está en la misma semana
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Primer día de la semana (domingo)

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Último día de la semana (sábado)

    if (inputDate >= startOfWeek && inputDate <= endOfWeek) {
        return inputDate.toLocaleString('es-ES', { weekday: 'long' }); // Solo el día
    }

    // Comprobar si la fecha es del año actual
    if (inputDate.getFullYear() === today.getFullYear()) {
        return inputDate.toLocaleString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' }); // Día de la semana y mes
    }

    // Fuera del año actual
    return inputDate.toLocaleString('es-ES', options); // Día, mes y año
    }
    return 'Fecha de creacion no disponible';
  }


}
