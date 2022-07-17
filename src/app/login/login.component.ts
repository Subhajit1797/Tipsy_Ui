import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup | any;
  error!: string | null;
  registrationData!: any;


  constructor(public router: Router) {

  }

  ngOnInit() {
    this.registrationData= JSON.parse(sessionStorage.getItem('registrationFormData') || '{}');
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(emailregex)]),
      password: new FormControl('', [Validators.required, this.checkPassword]),
    })
  }



  emaiErrors() {
    return this.loginForm.get('email').hasError('required') ? 'Email is required' :
      this.loginForm.get('email').hasError('pattern') ? 'Email is not valid' : ''
  }

  checkPassword(control: any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  getErrorPassword() {
    return this.loginForm.get('password').hasError('required') ? 'Password is required.' :
      this.loginForm.get('password').hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }

  checkValidation(input: string) {
    const validation = this.loginForm.get(input).invalid && (this.loginForm.get(input).dirty || this.loginForm.get(input).touched)
    return validation;
  }

  submit() {
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      if (this.loginForm.value.email === this.registrationData.email && this.loginForm.value.password === this.registrationData.password) {
        this.router.navigate(['home']);
      }
      else {
        this.error = 'Email or password is invalid!';
      }
    } else {
      this.error = 'Please enter email & password';
    }
  }

}




