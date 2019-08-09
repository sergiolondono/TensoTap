import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../mensajes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private toastr: MensajesService,) { }

  ngOnInit() {
  }

  registerUser(userData){
    let name = userData.name;
    let lastName = userData.lastName;
    let identification = userData.identification;
    let email = userData.email;
    let password = userData.password;
    
    this.toastr.showSuccess(`${name} ${lastName} ${email} ${identification} ${password} REGISTRO EXITOSO!`);

  }

}
