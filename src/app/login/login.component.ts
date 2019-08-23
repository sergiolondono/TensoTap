import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

// import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean; 
  checkCaptcha;
  loading: boolean = false;

  token;
  endpoint = environment.APIEndpoint + 'Login/authenticate';
  
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  
  signIn(credentials) {   
    this.loading = true; 
    this.authService.login(credentials)
    this.loading = false; 
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);    
    this.checkCaptcha = captchaResponse;    
}

  handleToken(token: string): void {
    console.log("handleToken not implemented." + token);
  }
  
}
