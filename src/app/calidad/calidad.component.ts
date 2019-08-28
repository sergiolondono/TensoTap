import { CalidadService } from './../services/calidad.service';
import { MensajesService } from './../mensajes.service';
import { Component, OnInit, ViewChild, ElementRef, Directive, Input, Renderer } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'calidad',
  templateUrl: './calidad.component.html',
  styleUrls: ['./calidad.component.css']
})

@Directive({ selector: '[myFocus]' })

export class CalidadComponent implements OnInit {

  data;
  dataDetalle;

  imagenValidar;

  modalOptions: NgbModalOptions = {};
  @ViewChild("modalValidacion") modalValidacion: ElementRef;

  @ViewChild("dataTable") table;
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  
  capturaCalidad: boolean = false;

  constructor(private toastr: MensajesService,
    private hostElement: ElementRef, private renderer: Renderer,
    private calidadService: CalidadService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.obtenerImagenesCalidad();
  }

  obtenerImagenesCalidad() {
    this.data = [];
    this.calidadService.imagenesCalidad().subscribe((data: {}) => {
      this.data = data;
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].ruta = "data:image/jpeg;base64," + this.data[i].ruta;        
      }
    });
  }

  validar(f){
    if(f.usuario === "usuarioCalidad" && f.inputCalidad === "")
      this.toastr.showWarning("Debe diligenciar el valor correcto en el campo de texto");

    if(f.usuario === "" && f.inputCalidad === "")
      this.toastr.showWarning("Debe seleccionar al menos una de las capturas presentadas!");

    console.log(f);
  }

  validarCapturas(imagen){
    console.log(imagen);
    this.dataDetalle = [];
    this.calidadService.detalleImagenesCalidad(imagen.idImagen).subscribe((data: {}) => {
      this.dataDetalle = data;
      this.imagenValidar = imagen.ruta;
      
      this.openModal();
    });    
  }

  habilitarControl(seleccion){
    seleccion === "calidad" ? this.capturaCalidad = true : this.capturaCalidad = false;   
  }

  guardarValidacion(){
    console.log("Guardar validación");
  }

  openModal() {
    this.fillModalOptions();
    this.modalService.open(this.modalValidacion, this.modalOptions);
  }

  cerrarModal() {
    this.modalService.dismissAll(this.modalValidacion);
  }

  private fillModalOptions() {
    this.modalOptions.backdrop = "static";
    this.modalOptions.keyboard = false;
  }

}
