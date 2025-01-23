import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NikoNikoSurveyComponent } from './niko-niko-survey.component';

describe('NikoNikoSurveyComponent', () => {
  let component: NikoNikoSurveyComponent;
  let fixture: ComponentFixture<NikoNikoSurveyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NikoNikoSurveyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NikoNikoSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
