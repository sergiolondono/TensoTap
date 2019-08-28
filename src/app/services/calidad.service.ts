import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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

}
