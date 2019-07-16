import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  userLogged;
  public isCollapsed = true;

  constructor(public authService: AuthService) { 
    this.userLogged = localStorage.getItem('user');
  }

  ngOnInit() {
  }

}
