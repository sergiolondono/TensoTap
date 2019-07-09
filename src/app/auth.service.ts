import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';

import { User } from './_models/user';

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

    this.authUser.AuthenticatedUser({
      name : "admin",
      password : "123456"
    });

    if(credentials.email == "sa@gmail.com" && credentials.password == "12")
    {
      localStorage.setItem('user', credentials.email);
      return true;
    }
    return false;
  }

  isLoggedIn(){
    if(localStorage.getItem('user') != null)
      return true;

    return false;
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }

}
