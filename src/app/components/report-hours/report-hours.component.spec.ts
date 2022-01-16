import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHoursComponent } from './report-hours.component';

describe('ReportHoursComponent', () => {
  let component: ReportHoursComponent;
  let fixture: ComponentFixture<ReportHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
