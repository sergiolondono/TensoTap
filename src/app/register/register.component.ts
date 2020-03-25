import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../mensajes.service';
import { UserService } from '../services/user.service';
import { UserRegister } from '../_models/userRegister';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  userRegister;
  responseService: any;

  constructor(private router: Router,
    private toastr: MensajesService,
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

  registerUser(userData) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userRegister = new UserRegister();
    this.userRegister.userName = userData.userName.trim();
    this.userRegister.nombre = userData.name;
    this.userRegister.apellidos = userData.lastName;
    this.userRegister.identificacion = userData.identification;
    this.userRegister.email = userData.email;
    this.userRegister.password = userData.password.trim();

    this.userService.saveUser(this.userRegister).subscribe(result => {
      // console.log(result);
      this.toastr.showSuccess('REGISTRO EXITOSO!');
      this.router.navigate(['/login']);
     }, (err) => {
      this.toastr.showError(`El registro no se guardo de forma correcta! \n ${err}`);
     });

  }

}
