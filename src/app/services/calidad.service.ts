import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalidadService {

  endpoint = environment.APIEndpoint + 'Calidad/';
  
  constructor(private http: HttpClient) { }

    private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  imagenesCalidad(): Observable<any> {
    return this.http.get(this.endpoint).pipe(
      map(this.extractData));
  }

  detalleImagenesCalidad(idImagen): Observable<any> {
    return this.http.get(this.endpoint + '?idImagen=' + idImagen).pipe(
      map(this.extractData));
  }

  guardarCalidad(calidad){
    return this.http.post(this.endpoint, calidad)
    .pipe(
      tap((calidad) => { } ),
      catchError(this.handle_Error)
    )
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
