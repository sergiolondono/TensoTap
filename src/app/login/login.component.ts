import { Router } from '@angular/router';
import { MensajesService } from './../mensajes.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login.service';

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
  data: any;
  token;
  endpoint = environment.APIEndpoint + 'Login/authenticate';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private toastr: MensajesService,
    private router: Router) { }

  ngOnInit() {
    this.clearLocalStorageApp();
  }

  clearLocalStorageApp(){
    localStorage.removeItem('initConfig');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  signIn(credentials) {
    this.loading = true;
    this.AuthenticatedUser(credentials);
  }

  resolved(captchaResponse: string) {
    this.checkCaptcha = captchaResponse;
}

  handleToken(token: string): void {
    console.log('handleToken not implemented.' + token);
  }

  AuthenticatedUser(user) {
    let credentials = {
      userName: user.usuario,
      password: user.password
    };
    return this.http.post(this.endpoint, credentials).subscribe(
      data => {
        this.data = data;
        console.log('POST Request is successful', data);
        localStorage.setItem('initConfig', JSON.stringify(this.data));
        localStorage.setItem('token', this.data[0].token);
        localStorage.setItem('user', credentials.userName);
        this.router.navigateByUrl('/indexacion');
      },
      error => {
        const unauthorized_code = 401;
        const internalServer_code = 500;

        let userMessage = 'Fatal error';
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case internalServer_code:
              userMessage = 'Error interno!';
              break;
            case unauthorized_code:
              userMessage = 'Credenciales inválidas';
              break;
            default:
              userMessage = 'Error de comunicación';
              break;
          }
        }
        this.loading = false;
        this.toastr.showInfo(userMessage);
        console.log('Error', error);
      }
    );
  }

}
