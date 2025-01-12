import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { ModulesName } from 'src/app/constants/modules.name';
import { ResponseCompleteSurvey } from 'src/app/models/survey/twelve-steps/response-complete-survey.model';
import { Activity, SurveyCompleteTwelveSteps } from 'src/app/models/survey/twelve-steps/survey-twelve-steps-complete-model';
import { ActivityList, SurveyTwelveSteps } from 'src/app/models/survey/twelve-steps/survey-twelve-steps-model';
import { SurveysService } from 'src/app/services/surveys/surveys.service';

@Component({
  selector: 'app-questions-survey-twelve-steps',
  templateUrl: './questions-survey-twelve-steps.page.html',
  styleUrls: ['./questions-survey-twelve-steps.page.scss'],
})
export class QuestionsSurveyTwelveStepsPage implements OnInit {

  constructor(private router: Router, private surveyService: SurveysService) { }

  questions!: Array<string>;
  answers!: Array<Array<string>>;

  currentQuestion: string | undefined;
  currentAnswers: Array<string> | undefined;

  selectedResponse: string | undefined;
  previousResponse: string | undefined;

  numberOfQuestion!: number;

  private suscription: Subscription | undefined;

  @ViewChild(ErrorMessageComponent) errorMessageComponent!: ErrorMessageComponent;

  activeModule!: SurveyTwelveSteps;
  surveyToComplete: SurveyCompleteTwelveSteps = {
    "activities": [],
    "surveyState": "ACTIVE"
  };

  ngOnInit() {
    this.surveyService.surveyActiveDataBehaviorObservable.subscribe(
      value => {
        console.log(value);
        this.numberOfQuestion = this.findNumberOfQuestionToComplete(value.activityList);
        console.log(this.numberOfQuestion);
        this.activeModule = value;

        this.surveyToComplete.activities = value.activityList.map( (activity: ActivityList) => activity as Activity );
        this.surveyToComplete.surveyState = value.surveyState;
      }
    );

    this.surveyService.getQuestionsOfActiveSurvey(ModulesName.TWELVE_STEPS_NAME).then( (response:Array<string>) =>
      {
        this.questions = response
        this.setQuestion(this.questions[this.numberOfQuestion]);
      }
      
    );

    this.surveyService.getAnswersOfActiveSurvey(ModulesName.TWELVE_STEPS_NAME).then( (response: Array<Array<string>>) =>
      {
        this.answers = response
        this.setAnswers(this.answers[this.numberOfQuestion]);
      }
    );
  }

  public setQuestion(question:string){
    this.currentQuestion = question;
  }

  public setAnswers(answers: Array<string>){
    this.currentAnswers = answers;
  }

  handleOptionSelected(option: string) {
    this.selectedResponse = option;
  }

  public sendResponse(){
    this.saveQuestionAndAnswer();
    if(this.numberOfQuestion < 11){
      this.numberOfQuestion = this.numberOfQuestion + 1; //Debe decrementar si hace un <- previous...
    }
    
    this.goToTheNextQuestionAndAnswers();
    console.log(this.surveyToComplete.activities);
  }

  public saveQuestionAndAnswer(){
    //Crear fomulario e ir completandolo.
    this.surveyToComplete.activities[this.numberOfQuestion].question = this.currentQuestion!;
    this.surveyToComplete.activities[this.numberOfQuestion].answer = this.selectedResponse!;
  }

  public goToTheNextQuestionAndAnswers(){
    this.setQuestion(this.questions[this.numberOfQuestion]);
    this.setAnswers(this.answers[this.numberOfQuestion]);
  }

  public findNumberOfQuestionToComplete(arr: Array<ActivityList>): number {
    return arr.findIndex(item => item.answer === undefined || item.answer === null);
  }

  public completeSurvey(){
    this.saveQuestionAndAnswer();
    this.surveyToComplete.surveyState = 'FINISHED';
    this.surveyService.completeSurvey(this.surveyToComplete).then(
      (value: ResponseCompleteSurvey) => {
        if(value.statusCode === "200"){
          console.log('Encuesta completada con exito');
          this.router.navigate(['/home']);
        }else{
          this.errorMessageComponent.errorMessage = value.statusMsg;
          this.errorMessageComponent.showError();
        }
      }
    );
  }

  public stopSurvey(){
    this.saveQuestionAndAnswer();
    this.surveyToComplete.surveyState = 'ACTIVE';
    this.surveyService.completeSurvey(this.surveyToComplete).then(
      (value: ResponseCompleteSurvey) => {
        if(value.statusCode === "200"){
          console.log('Encuesta cerrada con exito');
          this.router.navigate(['/home']);
        }else{
          this.errorMessageComponent.errorMessage = value.statusMsg;
          this.errorMessageComponent.showError();
        }
      }
    );
  }

}
