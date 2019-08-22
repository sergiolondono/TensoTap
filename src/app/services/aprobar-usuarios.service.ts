import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AprobarUsuariosService {

  endpoint = environment.APIEndpoint + 'Administracion';
  endpointUserRol = environment.APIEndpoint + 'UsuariosXRoles';

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  obtenerUsuarios(): Observable<any> {
    return this.http.get(this.endpoint).pipe(
      map(this.extractData));
  }

  guardarUsuarioXRol(usuarioxRol) {
    return this.http.post(this.endpointUserRol, usuarioxRol)
    .pipe(
      tap((usuarioxRol) => { } ),
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
