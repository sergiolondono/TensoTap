import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ReportesService } from 'src/app/services/reportes.service';
import { MensajesService } from 'src/app/mensajes.service';
import { DatatableService } from 'src/app/services/datatable.service';

@Component({
  selector: 'app-reporte-pendientes',
  templateUrl: './reporte-pendientes.component.html',
  styleUrls: ['./reporte-pendientes.component.css']
})
export class ReportePendientesComponent implements OnInit {

  @ViewChild('dataTable', { read: false}) table;

  data;
  dataTable: any;
  dtOptions: any = {};
  modelDesde: NgbDateStruct;
  modelHasta: NgbDateStruct;
  arrayCapturas: any[] = [];
  loading: boolean;

  constructor(private reportesService: ReportesService,
              private toastr: MensajesService,
              private datatableService: DatatableService) {
    this.mostrarReporte();
  }

  ngOnInit() {
  }

  mostrarReporte() {
    this.loading = false;

    this.reportesService
    .obtenerImgPendientes()
    .subscribe((data: {}) => {
      this.data = [];
      this.arrayCapturas = [];
      this.data = data;
      if (this.data.length) {
        const keys = Object.keys(this.data[0]);
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < keys.length; index++) {
          this.arrayCapturas.push({ title: keys[index], data: keys[index]});
        }
        this.configDataTable();
      } else {
        this.toastr.showInfo('No existen capturas con las fechas seleccionadas!');
      }
      this.loading = true;
    });
  }

  configDataTable() {
    this.dtOptions = this.datatableService.configDataTable(this.data, this.arrayCapturas);
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions).columns.adjust().draw();
  }

}
