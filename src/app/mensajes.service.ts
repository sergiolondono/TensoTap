import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class MensajesService {
  constructor(private toastr: ToastrService) {}

  showSuccess(mensaje) {
    this.toastr.success("", mensaje);
  }

  showSuccessDescarte(mensaje) {
    this.toastr.success("", mensaje);
  }

  showErrorDescarte(mensaje) {
    this.toastr.success("", mensaje);
  }

  showError(mensaje) {
    this.toastr.error("", mensaje);
  }

  showWarning(message) {
    this.toastr.warning("", message);
  }

  showInfo(message){
    this.toastr.info("", message);
  }

}
