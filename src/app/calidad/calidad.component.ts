import { CalidadService } from "./../services/calidad.service";
import { MensajesService } from "./../mensajes.service";
import { Component, OnInit, ViewChild, ElementRef, Directive } from "@angular/core";
import { NgbModalOptions, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PDFProgressData, PdfViewerComponent, PDFDocumentProxy, PDFSource } from "ng2-pdf-viewer";
import { FormGroup, FormControl } from '@angular/forms';
import { Calidad } from '../_models/calidad';

@Component({
  selector: "calidad",
  templateUrl: "./calidad.component.html",
  styleUrls: ["./calidad.component.scss"]
})

@Directive({ selector: "[myFocus]" })


export class CalidadComponent implements OnInit {
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
  loading: boolean = false;
  
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
    pdfQuery = "";

    imagenDocumento;

    nombreCampo;
    NPagina;

    radioSelected: any;

    unsubscribe: any;
    public fields: any[];
    public form: FormGroup;
    
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
    this.pdfSrc = "";
    this.existsPdfPage = false;
    this.NPagina = "";

    this.calidadService
      .detalleImagenesCalidad(imagen.idImagen)
      .subscribe((data: {}) => {        
        this.dataDetalle = data;
        console.log(this.dataDetalle);

        this.fields = this.dataDetalle[0].fields;
  
        this.form = new FormGroup({
          fields: new FormControl(JSON.stringify(this.fields))
        });
        this.unsubscribe = this.form.valueChanges.subscribe(update => {
          this.fields = JSON.parse(update.fields);
        });

        this.imagenValidar = imagen.ruta;
        this.imagenId = imagen.idImagen;
        // this.NPagina = this.dataDetalle[0].NPagina;
        this.nombreCampo = this.dataDetalle[0].nombreCampo;

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
    else
      this.usuarioCorrecto = this.usuarioCalidad;
  }

guardarCapturaCalidad(f){
   this.capturaCorrecta = f.name;
  // Grabar información en base de datos.
  this.confirmarProcesoCalidad();  
}

  guardarValidacion(f) {
    if (f.usuario === "") {
      this.toastr.showWarning(
        "Debe seleccionar al menos una de las capturas presentadas!"
      );
      return false;
    }
    // Grabar información en base de datos.
    this.confirmarProcesoCalidad();
  }

  confirmarProcesoCalidad(){
    this.calidad = new Calidad();
    this.calidad.idImagen = this.imagenId;
    this.calidad.usuarioCaptura = this.usuarioCorrecto;
    this.calidad.informacionCaptura = this.capturaCorrecta;
    this.calidad.esCapturaCalidad = this.capturaCalidad;

    this.calidadService.guardarCalidad(this.calidad).subscribe(
      result => {
        this.toastr.showSuccess("Captura guardada correctamente!");
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
    this.capturaCalidad = false;
    this.modalService.dismissAll(this.modalValidacion);
  }

  private fillModalOptions() {
    this.modalOptions.backdrop = "static";
    this.modalOptions.keyboard = false;
    // this.modalOptions.size = "lg";
    this.modalOptions.windowClass = "modal-calidad";
  }

  toggleOutline() {
    this.isOutlineShown = !this.isOutlineShown;
  }

  incrementPage(amount: number) {
    this.page += amount;
  }

  incrementZoom(amount: number) {
    this.zoom += amount;    
  }

  rotate(angle: number) {
    this.rotation += angle;
  }

  /**
   * Render PDF preview on selecting file
   */
  onFileSelected() {
    const $pdf: any = document.querySelector("#file");

    if (typeof FileReader !== "undefined") {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($pdf.files[0]);
    }
  }

  /**
   * Get pdf information after it's loaded
   * @param pdf
   */
  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.isLoaded = true;

    this.loadOutline();
  }

  /**
   * Get outline
   */
  loadOutline() {
    this.pdf.getOutline().then((outline: any[]) => {
      this.outline = outline;
    });
  }

  /**
   * Navigate to destination
   * @param destination
   */
  navigateTo(destination: any) {
    this.pdfComponent.pdfLinkService.navigateTo(destination);
  }

  /**
   * Scroll view
   */
  scrollToPage() {
    this.pdfComponent.pdfViewer.scrollPageIntoView({
      pageNumber: 3
    });
  }

  /**
   * Page rendered callback, which is called when a page is rendered (called multiple times)
   *
   * @param {CustomEvent} e
   */
  pageRendered(e: CustomEvent) {}

  searchQueryChanged(newQuery: string) {
    if (newQuery !== this.pdfQuery) {
      this.pdfQuery = newQuery;
      this.pdfComponent.pdfFindController.executeCommand("find", {
        query: this.pdfQuery,
        highlightAll: true
      });
    } else {
      this.pdfComponent.pdfFindController.executeCommand("findagain", {
        query: this.pdfQuery,
        highlightAll: true
      });
    }
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

  mostrarDocumentoCompleto(idImagen){
    this.loading = true;
    this.NPagina = "";
    this.calidadService.obtenerDocumentoCalidad(idImagen) 
    .subscribe((data: {}) => {
        this.existsPdfPage = !this.existsPdfPage;
        this.imagenDocumento = data;
        this.NPagina = Number(this.imagenDocumento.NPagina) + 1;
        // console.log(this.imagenDocumento);
         // PDF File
        var binaryImg = atob(this.imagenDocumento.Base64ImgOrginal);
        var length = binaryImg.length;
        var arrayBuffer = new ArrayBuffer(length);
        var uintArray = new Uint8Array(arrayBuffer);

        for (var i = 0; i < length; i++) {
          uintArray[i] = binaryImg.charCodeAt(i);
        }
        var currentBlob = new Blob([uintArray], { type: "application/pdf" });
        this.pdfSrc = URL.createObjectURL(currentBlob);
        //renderiza la imagen de entrada a la pantalla
        this.zoom = 1;
        this.existsPdfPage = true;
        // End PDF File

        this.loading = false;
      });
    }

}
