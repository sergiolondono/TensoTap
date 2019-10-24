import { InfoCaptured } from "./../_models/infoCaptured";
import { ActivatedRoute } from "@angular/router";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  Directive,
  AfterViewInit
} from "@angular/core";
import { DocumentsService } from "../services/documents.service";
import { LoginService } from "../login.service";
import { FormGroup, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MensajesService } from "../mensajes.service";
import { NgSelectComponent } from "@ng-select/ng-select";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { DescarteService } from "../descarte.service";

@Component({
  selector: "app-indexacion",
  templateUrl: "./indexacion.component.html",
  styleUrls: ["./indexacion.component.css"]
})
export class IndexacionComponent implements OnInit {
  document;
  descartes;
  image;
  imageId;
  converted_image;
  infoCaptured;
  error: boolean = false;
  unsubscribe: any;
  public fields: any[];
  public form: FormGroup;
  public formCaptured: any;
  campodiligenciado: any;
  esDescartado: boolean;
  motivosDescarte: any = [];
  motivoSelected: any;

  @ViewChild("modalConfirm", {read: false}) modalconfirm: ElementRef;
  @ViewChild("modalDescarte", {read: false}) modaldescarte: ElementRef;
  modalOptions: NgbModalOptions = {};

  constructor(
    private documentService: DocumentsService,
    private descarteService: DescarteService,
    private route: ActivatedRoute,
    private login: LoginService,
    private toastr: MensajesService,
    private modalService: NgbModal
  ) {
    this.getDocuments();
  }

  title = "TensoTapApp";

  ngOnInit() {}

  descartarDocumento() {
    this.esDescartado = true;
    this.getMotivosDescarte();
    this.openModalDescarte();
    // //if (confirm("Desea descartar el documento?")) {
    // this.form.reset();
    // this.getDocuments();
    // // }
  }

  guardarCaptura(f) {
    this.formCaptured = f;
    this.infoCaptured = new InfoCaptured();
    this.infoCaptured.idImagen = this.imageId;
    this.infoCaptured.informacionCaptura = this.formCaptured.name;
    this.infoCaptured.usuarioCaptura = localStorage.getItem("user");
    this.infoCaptured.esCapturaCalidad = false;
    this.infoCaptured.esDescarte = false;

    console.log(
      "Captura: " +
        this.formCaptured.name +
        " ImagenId: " +
        this.imageId +
        " Usuario: " +
        this.infoCaptured.usuarioCaptura
    );

    if (this.documentService.saveDocument(this.infoCaptured))
      this.toastr.showSuccess("Captura guardada exitosamente!");
    else this.toastr.showError("La captura no se guardó de forma correcta!");

    this.cerrarModal();
    this.form.reset();
    this.getDocuments();
  }

  getDocuments() {
    this.document = "";
    this.documentService.getDocuments(localStorage.getItem("user")).subscribe(
      (data: {}) => {
        this.document = data;

        if (
          this.document.fieldForm !== null &&
          this.document.imageProccess !== null
        ) {
          this.fields = this.document.fieldForm;

          this.imageId = this.document.imageProccess.id;

          this.form = new FormGroup({
            fields: new FormControl(JSON.stringify(this.fields))
          });
          this.unsubscribe = this.form.valueChanges.subscribe(update => {
            this.fields = JSON.parse(update.fields);
          });
          this.converted_image =
            "data:image/jpeg;base64," + this.document.imageProccess.imageBytes;
        } else {
          this.toastr.showInfo("No hay imágenes para capturar!");
        }
      },
      error => {
        if (error.status === 401) {
          this.error = true;
          this.toastr.showWarning("Acceso no autorizado!");
        }
      }
    );
  }

  getDocument() {
    this.document = "";
    this.documentService.getDocument(3).subscribe((data: {}) => {
      this.document = data;
      this.fields = this.document.fieldForm;
      this.image = this.document.imageProccess.imageBytes;
      this.converted_image = "data:image/jpeg;base64," + this.image;
    });
  }

  openModal(f) {
    this.fillModalOptions();
    this.campodiligenciado = f.name;
    this.formCaptured = f;
    this.modalService.open(this.modalconfirm, this.modalOptions);
  }

  cerrarModal() {
    this.modalService.dismissAll(this.modalconfirm);
  }

  openModalDescarte() {
    this.fillModalOptions();
    this.modalService.open(this.modaldescarte, this.modalOptions);
  }

  cerrarModalDescarte() {
    this.modalService.dismissAll(this.modaldescarte);
  }

  guardarMotivoDescarte() {

    this.infoCaptured = new InfoCaptured();
    this.infoCaptured.idImagen = this.imageId;
    this.infoCaptured.usuarioCaptura = localStorage.getItem("user");
    this.infoCaptured.esCapturaCalidad = false;

    if (this.motivoSelected === "1") {
      this.infoCaptured.informacionCaptura = "";
      this.infoCaptured.esDescarte = false;

      if (this.documentService.saveDocument(this.infoCaptured))
        this.toastr.showSuccess("Captura guardada exitosamente!");
      else this.toastr.showError("La captura no se guardó de forma correcta!");
    }
    else {
      this.infoCaptured.informacionCaptura = this.motivoSelected;
      this.infoCaptured.esDescarte = true;

      if (this.documentService.saveDocument(this.infoCaptured))
      this.toastr.showSuccess("Captura guardada exitosamente!");
      else this.toastr.showError("La captura no se guardó de forma correcta!");
    }

    this.cerrarModalDescarte();
    this.form.reset();
    this.getDocuments();
  }

  private fillModalOptions() {
    this.modalOptions.backdrop = "static";
    this.modalOptions.keyboard = false;
  }

  getMotivosDescarte() {
    this.motivosDescarte = [];

    let descartesLocal = JSON.parse(localStorage.getItem("descartesLocal"));
    if (!descartesLocal) {
      this.descarteService.getDescartes().subscribe((data: {}) => {
        this.motivosDescarte = data;
        localStorage.setItem(
          "descartesLocal",
          JSON.stringify(this.motivosDescarte)
        );
      });
      // this.motivosDescarte = this.descartes;
    } else {
      this.motivosDescarte = descartesLocal;
    }
  }
}
