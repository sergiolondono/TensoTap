import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { LoginService } from './login.service';

import { User } from './_models/user';
import { environment } from 'src/environments/environment';
import 'rxjs/add/Observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = environment.APIEndpoint + 'Login/authenticate';
  token;
  userName: string;

  user$: Observable<any>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authUser: LoginService,
    private http: HttpClient) {
     }

  isAuthenticated(){
    if(localStorage.getItem('user') != null)
      return true;

    return false;
  }

  login(credentials){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.authUser.AuthenticatedUser({
      userName : credentials.usuario,
      password : credentials.password
    });

    return this.http.post(this.endpoint, {
         userName : credentials.usuario,
         password : credentials.password
       })
    .subscribe(data => 
      { 
        this.token = data;
        console.log("POST Request is successful", data);
        this.userName = credentials.usuario;
        localStorage.setItem('user', credentials.usuario);
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
  
  isLoggedIn(){
    if(localStorage.getItem('user') != null)
      return true;

    return false;
  }

  get UserMenu(){
    return Observable.of(this.token);
  }

  get User() {
    return Observable.of(localStorage.getItem('user'));
  }

  logout(){
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.clear();    
    this.router.navigateByUrl('/login');
  }

}
