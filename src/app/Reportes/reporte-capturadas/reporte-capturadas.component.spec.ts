import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCapturadasComponent } from './reporte-capturadas.component';

describe('ReporteCapturadasComponent', () => {
  let component: ReporteCapturadasComponent;
  let fixture: ComponentFixture<ReporteCapturadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteCapturadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCapturadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
