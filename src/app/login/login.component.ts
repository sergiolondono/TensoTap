
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';
// import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean; 
  checkCaptcha;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService,
    // private recaptchaV3Service: ReCaptchaV3Service
  ) { }

  ngOnInit() {
  }

  
  signIn(credentials) {    
    if(this.authService.login(credentials))
      this.router.navigateByUrl('/indexacion'); 
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);    
    this.checkCaptcha = captchaResponse;    
}

  handleToken(token: string): void {
    console.log("handleToken not implemented." + token);
  }
  
}
