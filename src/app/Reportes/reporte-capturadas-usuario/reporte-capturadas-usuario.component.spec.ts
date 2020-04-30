import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCapturadasUsuarioComponent } from './reporte-capturadas-usuario.component';

describe('ReporteCapturadasUsuarioComponent', () => {
  let component: ReporteCapturadasUsuarioComponent;
  let fixture: ComponentFixture<ReporteCapturadasUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteCapturadasUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCapturadasUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
