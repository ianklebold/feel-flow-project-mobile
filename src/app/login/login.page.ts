import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from '../models/auth/auth-data';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private loginService: LoginService) { }

  showPassword = false;


  ngOnInit() {}

  loginUser: AuthData = {
    username: 'username',
    password: '1234'
  }

  login( fLogin: NgForm ){
    
    this.loginService.login(this.loginUser);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
