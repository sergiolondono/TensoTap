
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint = 'http://localhost:56121/api/';
  token;
  constructor(private http: HttpClient) { }
  
  AuthenticatedUser(user) {
    let credentials = {
      userName : user.name,
      password : user.password     
    };

    return this.http.post(this.endpoint + 'Login/authenticate', credentials)
    .subscribe(data => 
      { 
        this.token = data;
        console.log("POST Request is successful", data) ;
        localStorage.setItem('token', this.token);        
    },
    error => { console.log("Error", error) }
    );
  }

}
