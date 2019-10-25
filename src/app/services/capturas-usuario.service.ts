import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CapturasUsuarioService {

  constructor(private http: HttpClient) { }

  endpoint = environment.APIEndpoint + 'CapturaxUsuario/';

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  obtenerCapturasUsuario(usuario, mesActual): Observable<any> {
    return this.http.get(this.endpoint + '?usuario=' + usuario + '&mesActual=' + mesActual).pipe(
      map(this.extractData));
  }

}
