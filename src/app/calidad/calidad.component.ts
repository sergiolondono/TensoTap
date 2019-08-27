import { MensajesService } from './../mensajes.service';
import { Component, OnInit, ViewChild, ElementRef, Directive, Input, Renderer } from '@angular/core';

@Component({
  selector: 'calidad',
  templateUrl: './calidad.component.html',
  styleUrls: ['./calidad.component.css']
})

@Directive({ selector: '[myFocus]' })

export class CalidadComponent implements OnInit {

  @ViewChild("dataTable") table;
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  
  capturaCalidad: boolean = false;

  constructor(private toastr: MensajesService,
    private hostElement: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
  }

  signIn(f){
    if(f.usuario === "usuarioCalidad" && f.inputCalidad === "")
      this.toastr.showWarning("Debe diligenciar el valor correcto en el campo de texto");

    if(f.usuario === "" && f.inputCalidad === "")
      this.toastr.showWarning("Debe seleccionar al menos una de las capturas presentadas!");

    console.log(f);
  }

  habilitarControl(seleccion){
    seleccion === "calidad" ? this.capturaCalidad = true : this.capturaCalidad = false;   
  }
}
