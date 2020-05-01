import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reporte-capturadas',
  templateUrl: './reporte-capturadas.component.html',
  styleUrls: ['./reporte-capturadas.component.css']
})
export class ReporteCapturadasComponent implements OnInit {

  modelDesde: NgbDateStruct;
  modelHasta: NgbDateStruct;

  constructor() {  }

  ngOnInit() {
  }

  mostrarReporte() {
    const fechaDesde = new Date(this.modelDesde.year, this.modelDesde.month - 1, this.modelDesde.day).toISOString().substr(0, 10);
    const fechaHasta = new Date(this.modelHasta.year, this.modelHasta.month - 1, this.modelHasta.day).toISOString().substr(0, 10);
    console.warn('Your order has been submitted', fechaDesde + fechaHasta);
  }

}
