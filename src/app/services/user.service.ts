import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { MensajesService } from '../mensajes.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class UserService {
  
  endpoint = environment.APIEndpoint + 'Usuario/';

  constructor(private http: HttpClient,
    private toastr: MensajesService) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  saveUser(userRegister) {
    return this.http.post(this.endpoint, userRegister)
    .pipe(
      tap((userRegister) => { } ),
      catchError(this.handle_Error)
    );
  }

  handle_Error(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      console.log(`status: ${error.status} Message: ${error.error.ExceptionMessage}`);
      errorMessage = `\n${error.error.ExceptionMessage}`;
    }
    return throwError(errorMessage);
  }

}
