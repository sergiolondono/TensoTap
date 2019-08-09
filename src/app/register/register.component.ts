import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../mensajes.service';
import { UserService } from '../user.service';
import { UserRegister } from '../_models/userRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegister;

  constructor(private toastr: MensajesService,
   private userService: UserService) { }

  ngOnInit() {
  }

  registerUser(userData){
    this.userRegister = new UserRegister();
    this.userRegister.userName = userData.userName;
    this.userRegister.name = userData.name;
    this.userRegister.lastName = userData.lastName;
    this.userRegister.identification = userData.identification;
    this.userRegister.email = userData.email;
    this.userRegister.password = userData.password;
    
    if(this.userService.saveUser(this.userRegister))
      this.toastr.showSuccess('REGISTRO EXITOSO!');
    else  
      this.toastr.showError('El registro no se guardo de forma correcta!')
  }

}
