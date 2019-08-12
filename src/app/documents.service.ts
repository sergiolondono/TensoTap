import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  @Input() field:any = {};
  @Input() form:FormGroup;
  get isValid() { return this.form.controls[this.field.name].valid; }

  public fields: any[];

 endpoint = 'http://localhost:58654/api/Imagenes';

 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

 constructor(private http: HttpClient) { }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getDocuments(usuario): Observable<any> {
    return this.http.get(this.endpoint + '?usuario=usuario').pipe(
      map(this.extractData));
  }
  
  getDocument(id): Observable<any> {
    return this.http.get(this.endpoint + id).pipe(
      map(this.extractData));
  }

  saveDocument(infoCapturada) {
    return this.http.post(this.endpoint, infoCapturada)
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      return true;
      },
      error  => {
      console.log("Error", error);
      return false;
      });
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
