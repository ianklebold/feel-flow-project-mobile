import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from '../models/auth/auth-data';
import { LoginService } from '../services/login/login.service';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorConstants } from '../constants/error.message';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private loginService: LoginService) { }

  @ViewChild(ErrorMessageComponent) errorMessageComponent!: ErrorMessageComponent;
  
  showPassword = false;


  ngOnInit() {}

  loginUser: AuthData = {
    username: '',
    password: ''
  }

  login(fLogin: NgForm) {
    this.loginService.login(this.loginUser)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        if (error instanceof HttpErrorResponse) {
          if(error.status === 401){
            this.errorMessageComponent.errorMessage = ErrorConstants.noAuthorizedLoginMessage; 
          }else{
            this.errorMessageComponent.errorMessage = ErrorConstants.serverNotAvailable;
          }
          this.errorMessageComponent.showError();
        }
      });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
