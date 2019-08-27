import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginService } from '../login.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  userLogged;
  userConfigInit;

  public isCollapsed = true;

  constructor(public authService: AuthService,
    public loginService: LoginService) { 
      // console.log(loginService.data);
      // this.userConfigInit = JSON.stringify(loginService.data);
    //this.userConfigInit = JSON.parse(localStorage.getItem('initConfig'));
    //console.log(this.userConfigInit);
    this.authService.UserMenu.subscribe(userMenu => (this.userConfigInit = userMenu))
    this.authService.User.subscribe(userLogged => (this.userLogged = userLogged));       
  }

  ngOnInit() {
  }

}
