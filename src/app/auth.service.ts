import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { LoginService } from './login.service';

import { User } from './_models/user';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authUser: LoginService) {
     }

  isAuthenticated(){
    if(localStorage.getItem('user') != null)
      return true;

    return false;
  }

  login(credentials){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    // this.authUser.AuthenticatedUser({
    //   userName : credentials.email,
    //   password : credentials.password
    // });


    // return this.http.post(this.endpoint, {
    //      userName : credentials.email,
    //      password : credentials.password
    //    })
    // .subscribe(data => 
    //   { 
    //     this.token = data;
    //     console.log("POST Request is successful", data) ;
    //     localStorage.setItem('token', this.token); 
    //     this.router.navigateByUrl('/indexacion');        
    // },
    // error => { console.log("Error", error) }
    // );

    // if(credentials.email == "sa@gmail.com" && credentials.password == "12")
    // {
    //   localStorage.setItem('user', credentials.email);
    //   return true;
    // }
    // return false;
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

  logout(){
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.clear();    
    this.router.navigateByUrl('/login');
  }

}
