import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsSurveyTwelveStepsPage } from './questions-survey-twelve-steps.page';

describe('QuestionsSurveyTwelveStepsPage', () => {
  let component: QuestionsSurveyTwelveStepsPage;
  let fixture: ComponentFixture<QuestionsSurveyTwelveStepsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsSurveyTwelveStepsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
