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
import { Calidad } from "../_models/calidad";
import {
  PDFProgressData,
  PdfViewerComponent,
  PDFDocumentProxy,
  PDFSource
} from "ng2-pdf-viewer";

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
  pdfSrc: string | PDFSource | ArrayBuffer;
  existsPdfPage: boolean = false;
    // variables para visor pdf
    error: any;
    page = 1; 
    rotation = 0;
    zoom = 1.0;
    originalSize = true;
    pdf: any;
    renderText = true;
    progressData: PDFProgressData;
    isLoaded = false;
    stickToPage = false;
    showAll = false;
    autoresize = true;
    fitToPage = false;
    outline: any[];
    isOutlineShown = false;

    imagenDocumento;

    nombreCampo;
    NPagina;

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
        this.data[i].ruta = "data:image/jpeg;base64," + this.data[i].Base64Img;
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
        this.NPagina = this.dataDetalle[0].NPagina;
        this.nombreCampo = this.dataDetalle[0].nombreCampo;

        // // PDF File
        // var binaryImg = atob(this.dataDetalle[0].documento);
        // var length = binaryImg.length;
        // var arrayBuffer = new ArrayBuffer(length);
        // var uintArray = new Uint8Array(arrayBuffer);

        // for (var i = 0; i < length; i++) {
        //   uintArray[i] = binaryImg.charCodeAt(i);
        // }
        // var currentBlob = new Blob([uintArray], { type: "application/tiff" });
        // this.pdfSrc = URL.createObjectURL(currentBlob);

        // //renderiza la imagen de entrada a la pantalla
        // this.zoom = 1;
        // this.existsPdfPage = true;
        // // End PDF File

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
    if (f.usuario === "usuarioCalidad") {
      if (f.inputCalidad === "") {
        this.toastr.showWarning(
          "Debe diligenciar el valor correcto en el campo de texto"
        );
        return false;
      }
      this.usuarioCorrecto = this.usuarioCalidad;
      this.capturaCorrecta = f.inputCalidad;
    }

    if (f.usuario === "") {
      this.toastr.showWarning(
        "Debe seleccionar al menos una de las capturas presentadas!"
      );
      return false;
    }

    this.calidad = new Calidad();
    this.calidad.idImagen = this.imagenId;
    this.calidad.usuarioCaptura = this.usuarioCorrecto;
    this.calidad.informacionCaptura = this.capturaCorrecta;
    this.calidad.esCapturaCalidad = this.capturaCalidad;

    console.log(`Usuario: ${this.usuarioCorrecto} \r 
    Captura: ${this.capturaCorrecta} \r
    esCapturaCalidad: ${this.capturaCalidad} \r
    idImagen: ${this.imagenId}`);

    this.calidadService.guardarCalidad(this.calidad).subscribe(
      result => {
        this.toastr.showSuccess("Captura guardada correctamente!");
        console.log(result);
        this.obtenerImagenesCalidad();
      },
      err => {
        this.toastr.showError(
          `El registro no se guardo de forma correcta! \n ${err}`
        );
      }
    );

    this.cerrarModal();
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
    // this.modalOptions.size = "lg";
    this.modalOptions.windowClass = "modal-calidad";
  }

  onProgress(progressData: PDFProgressData) {
    this.progressData = progressData;
    this.isLoaded = false;
    this.error = null; // clear error
  }

    onError(error: any) {
    this.error = error; // set error

    if (error.name === "PasswordException") {
      const password = prompt(
        "This document is password protected. Enter the password:"
      );
    }
  }

  mostrarDocumentoCompleto(){
    this.existsPdfPage = !this.existsPdfPage;
  }

}
