import { HttpClient } from '@angular/common/http';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
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
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  
  signIn(credentials) {   
    this.loading = true; 

   this.http.post(this.endpoint, {
         userName : credentials.email,
         password : credentials.password
       })
    .subscribe(data => 
      { 
        this.token = data;
        console.log("POST Request is successful", data) ;
        localStorage.setItem('token', this.token); 
        localStorage.setItem('user', credentials.email);
        this.router.navigateByUrl("/indexacion");
        this.loading = false;       
    },
    error => { console.log("Error", error) }
    );

     

    // if(this.authService.login(credentials)){
    //   this.router.navigateByUrl('/indexacion'); 
    //   this.loading = false;
    // } 

  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);    
    this.checkCaptcha = captchaResponse;    
}

  handleToken(token: string): void {
    console.log("handleToken not implemented." + token);
  }
  
}
