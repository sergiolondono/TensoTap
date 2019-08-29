import { CalidadService } from "./../services/calidad.service";
import { MensajesService } from "./../mensajes.service";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Directive
} from "@angular/core";
import { NgbModalOptions, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Calidad } from '../_models/calidad';

@Component({
  selector: "calidad",
  templateUrl: "./calidad.component.html",
  styleUrls: ["./calidad.component.css"]
})
@Directive({ selector: "[myFocus]" })
export class CalidadComponent implements OnInit {
  data;
  calidad;
  dataDetalle;

  imagenValidar;
  imagenId;

  usuarioCalidad;

  usuarioCorrecto;
  capturaCorrecta;

  modalOptions: NgbModalOptions = {};
  @ViewChild("modalValidacion") modalValidacion: ElementRef;

  @ViewChild("dataTable") table;
  dataTable: any;
  dtOptions: DataTables.Settings = {};

  capturaCalidad: boolean = false;

  constructor(
    private toastr: MensajesService,
    private calidadService: CalidadService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.obtenerImagenesCalidad();
    this.usuarioCalidad = localStorage.getItem("user");
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

  validarCapturas(imagen) {
    this.dataDetalle = [];
    this.calidadService
      .detalleImagenesCalidad(imagen.idImagen)
      .subscribe((data: {}) => {
        this.dataDetalle = data;
        this.imagenValidar = imagen.ruta;
        this.imagenId = imagen.idImagen;
        this.openModal();
      });
  }

  habilitarControl(seleccion, info) {
    seleccion === "calidad"
      ? (this.capturaCalidad = true)
      : (this.capturaCalidad = false);

    if (info !== null) {
      this.usuarioCorrecto = info.usuarioCaptura;
      this.capturaCorrecta = info.informacionCaptura;
    }
  }

  guardarValidacion(f) {
    if (f.usuario === "usuarioCalidad")
    {
      if(f.inputCalidad === "")
      {
        this.toastr.showWarning("Debe diligenciar el valor correcto en el campo de texto");
        return false;
      }     
      this.usuarioCorrecto = this.usuarioCalidad;
      this.capturaCorrecta = f.inputCalidad;
    }      

    if (f.usuario === "")
    {
      this.toastr.showWarning("Debe seleccionar al menos una de las capturas presentadas!");
      return false;
    }
    
    this.calidad = new Calidad();
    this.calidad.idImagen = this.imagenId;
    this.calidad.usuarioCaptura = this.usuarioCorrecto;
    this.calidad.informacionCaptura = this.capturaCorrecta;
    this.calidad.esCapturaCalidad = this.capturaCalidad

    console.log(`Usuario: ${this.usuarioCorrecto} \r 
    Captura: ${this.capturaCorrecta} \r
    esCapturaCalidad: ${this.capturaCalidad} \r
    idImagen: ${ this.imagenId }` );

    this.cerrarModal();
    this.toastr.showSuccess("Captura guardada correctamente!");
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
