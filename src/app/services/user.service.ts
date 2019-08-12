import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = 'http://localhost:58654/api/Usuario/';

  constructor(private http: HttpClient) { }

 saveUser(userRegister){
  return this.http.post(this.endpoint, userRegister)
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      return true;
      },
      error  => {
      console.log("Error", error);
      return false;
      });
 } 

}
