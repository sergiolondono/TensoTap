import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { MensajesService } from './mensajes.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint = environment.APIEndpoint + 'Login/authenticate';
  data: any;
  constructor(private http: HttpClient,
    private router: Router,
    private toastr: MensajesService,) { }
  
  AuthenticatedUser(user) {
    let credentials = {
      userName : user.userName,
      password : user.password     
    };

    return this.http.post(this.endpoint, credentials)
    .subscribe(data => 
      { 
        this.data = data;
        console.log("POST Request is successful", data);
        localStorage.setItem('initConfig', JSON.stringify(this.data));
        localStorage.setItem('token', this.data[0].token); 
        this.router.navigateByUrl('/indexacion');        
    },
    error => { 
      this.toastr.showInfo('Usuario o contraseña inválida!');
      console.log("Error", error) 
    }
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

