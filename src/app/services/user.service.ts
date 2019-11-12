import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { MensajesService } from "../mensajes.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  endpoint = environment.APIEndpoint + "Usuario/";

  constructor(private http: HttpClient, private toastr: MensajesService) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  saveUser(userRegister) {
    return this.http.post(this.endpoint, userRegister).pipe(
      tap(userRegister => {}),
      catchError(this.handle_Error)
    );
  }

  handle_Error(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      if (error.status == 400) {
        for (var key in error.error.ModelState) {
          console.log(error.error.ModelState[key]);
          errorMessage += error.error.ModelState[key] + "\r\n";
        }
      } else if (error.status == 500) {
        console.log(error);
        errorMessage = `\n${error.error.Message}`;
      }
    }
    return throwError(errorMessage);
  }
}
