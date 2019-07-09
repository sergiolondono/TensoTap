import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint = 'http://localhost:56121/api/';
  token;
  constructor(private http: HttpClient, private authHttp: AuthHttp) { }
  
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

  GuardarLote(){
    console.log("GuardarLote");
    let lote = {
      NIdentificacion: "1",
      fecha: "06/10/2019",
      idDocumento: 139245411,
      identificadorfisico: "123",
      idlote: 31771887,
      idtempla: 1188,
      idtipodoc: 1472,
      tipodocumento: "Cedula de Ciudadania"
      } 

    return this.authHttp.post(this.endpoint + 'Lote/guardar', lote)
    .subscribe(data => { console.log("POST Request Lote", data) },
    error => { console.log("Error", error) }
    );

  }

}
