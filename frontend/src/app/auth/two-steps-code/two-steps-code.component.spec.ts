import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoStepsCodeComponent } from './two-steps-code.component';

describe('TwoStepsCodeComponent', () => {
  let component: TwoStepsCodeComponent;
  let fixture: ComponentFixture<TwoStepsCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoStepsCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoStepsCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
