import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../mensajes.service';
import { UserService } from '../services/user.service';
import { UserRegister } from '../_models/userRegister';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  userRegister;

  constructor(private toastr: MensajesService,
   private userService: UserService,
   private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        userName: ['', Validators.required],
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        identification: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  registerUser(userData){
    console.log(userData);
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
  }

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
