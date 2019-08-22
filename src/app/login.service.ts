
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint = environment.APIEndpoint + 'Login/authenticate';
  token;
  constructor(private http: HttpClient,
    private router: Router) { }
  
  AuthenticatedUser(user) {
    let credentials = {
      userName : user.userName,
      password : user.password     
    };

    // return this.http.post(this.endpoint, credentials)
    // .pipe(
    //   tap((usuario) => { } ),
    //   catchError(this.handle_Error)
    // );

    return this.http.post(this.endpoint, credentials)
    .subscribe(data => 
      { 
        this.token = data;
        console.log("POST Request is successful", data) ;
        localStorage.setItem('token', this.token); 
        this.router.navigateByUrl('/indexacion');        
    },
    error => { console.log("Error", error) }
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

