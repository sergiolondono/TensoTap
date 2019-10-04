import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { MensajesService } from "./mensajes.service";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  endpoint = environment.APIEndpoint + "Login/authenticate";
  data: any;

  querying: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: MensajesService
  ) {}

  AuthenticatedUser(user) {
    let credentials = {
      userName: user.usuario,
      password: user.password
    };
    return this.http.post(this.endpoint, credentials).subscribe(
      data => {
        this.data = data;
        console.log("POST Request is successful", data);
        localStorage.setItem("initConfig", JSON.stringify(this.data));
        localStorage.setItem("token", this.data[0].token);
        localStorage.setItem('user', credentials.userName);
        this.router.navigateByUrl("/indexacion");
      },
      error => {
        const unauthorized_code = 401;
        const internalServer_code = 500;

        let userMessage = "Fatal error";
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case internalServer_code:
              userMessage = "Error interno!";
              break;
            case unauthorized_code:
              console.log(error.error.Message);
              userMessage = error.error.Message;
              break;
            default:
              userMessage = "Error de comunicación";
              break;
          }
        }
        this.querying = false;
        this.toastr.showInfo(userMessage);
        console.log("Error", error);
      }
    );
  }

  handle_Error(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      console.log(
        `status: ${error.status} Message: ${error.error.ExceptionMessage}`
      );
      errorMessage = `\n${error.error.ExceptionMessage}`;
    }
    return throwError(errorMessage);
  }
}
