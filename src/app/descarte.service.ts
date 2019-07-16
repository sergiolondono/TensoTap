import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DescarteService {

  endpoint = 'http://localhost:58654/api/Descarte/';

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
  getDescartes(): Observable<any> {
    return this.http.get(this.endpoint).pipe(
      map(this.extractData));
  }
}
