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
  userConfigInit: any[] = [];

  public isCollapsed = true;

  constructor(public authService: AuthService,
    public loginService: LoginService) { 
    this.authService.User.subscribe(userLogged => (this.userLogged = userLogged))
    this.authService.UserMenu.subscribe(userMenu => (this.userConfigInit = userMenu));
    if(this.userConfigInit == undefined)
      this.userConfigInit = JSON.parse(localStorage.getItem('initConfig'));     
  }

  ngOnInit() {
  }

}
