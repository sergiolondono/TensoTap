import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CapturasUsuarioService } from '../services/capturas-usuario.service';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatatableService } from '../services/datatable.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
capturaSelected: any;
data;
dataTable: any;
dtOptions: DataTables.Settings = {};
modalOptions: NgbModalOptions = {};
@ViewChild("dataTable", { read: false}) table;
@ViewChild("modalDetalleCaptura", { read: false}) modalDetalleCaptura: ElementRef;

arrayCapturas: any[]=[];

  constructor(private capturasService: CapturasUsuarioService,
    private modalService: NgbModal,
    private datatableService: DatatableService) { }

  ngOnInit() { 
    this.ObtenerCapturas(true);
   }


  ObtenerCapturas(mesActual) {
    this.capturasService
    .obtenerCapturasUsuario(localStorage.getItem('user'), mesActual)
    .subscribe((data: {}) => {
      this.data = [];
      this.arrayCapturas = [];
      this.data = data;
      var keys = Object.keys(this.data[0]);      
      for (let index = 0; index < keys.length; index++) {
        this.arrayCapturas.push({ title: keys[index], data: keys[index]});         
      }
      this.configDataTable();
    });
  }
  
  configDataTable(){    
    this.dtOptions = this.datatableService.configDataTable(this.data, this.arrayCapturas);  
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);
  }

}
