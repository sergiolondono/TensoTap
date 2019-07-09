
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean; 

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  signIn(credentials) {    
    
    if(this.authService.login(credentials))
      this.router.navigateByUrl('/home');

  }
}
