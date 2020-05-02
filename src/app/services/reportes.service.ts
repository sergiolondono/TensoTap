import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  endpoint = environment.APIEndpoint + 'Reportes/';

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  obtenerImgCapturadas(desde, hasta): Observable<any> {
    return this.http.get(this.endpoint + 'imagenesCapturadas?desde=' + desde + '&hasta=' + hasta).pipe(
      map(this.extractData));
  }

  obtenerImgCapturadasxUsuario(desde, hasta): Observable<any> {
    return this.http.get(this.endpoint + 'imagenesCapturadasxUsuario?desde=' + desde + '&hasta=' + hasta).pipe(
      map(this.extractData));
  }

  obtenerImgPendientes(): Observable<any> {
    return this.http.get(this.endpoint + 'imagenesPendientes').pipe(
      map(this.extractData));
  }

}
