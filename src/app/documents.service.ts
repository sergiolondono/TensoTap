import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
 //endpoint = 'https://jsonplaceholder.typicode.com/posts';
 endpoint = 'http://localhost:59357/api/Values';
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

  getDocuments(): Observable<any> {
    return this.http.get(this.endpoint).pipe(
      map(this.extractData));
  }
  
  getDocument(id): Observable<any> {
    return this.http.get(this.endpoint + 'products/' + id).pipe(
      map(this.extractData));
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
