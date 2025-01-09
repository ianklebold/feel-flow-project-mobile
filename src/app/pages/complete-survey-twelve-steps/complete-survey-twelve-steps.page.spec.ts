import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteSurveyTwelveStepsPage } from './complete-survey-twelve-steps.page';

describe('CompleteSurveyTwelveStepsPage', () => {
  let component: CompleteSurveyTwelveStepsPage;
  let fixture: ComponentFixture<CompleteSurveyTwelveStepsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteSurveyTwelveStepsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
