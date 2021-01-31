import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTrainingTssComponent } from './past-training-tss.component';

describe('PastTrainingTssComponent', () => {
  let component: PastTrainingTssComponent;
  let fixture: ComponentFixture<PastTrainingTssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastTrainingTssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTrainingTssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
