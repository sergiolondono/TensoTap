import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePendientesComponent } from './reporte-pendientes.component';

describe('ReportePendientesComponent', () => {
  let component: ReportePendientesComponent;
  let fixture: ComponentFixture<ReportePendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
