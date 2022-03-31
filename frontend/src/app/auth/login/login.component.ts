import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginRequest = {
    email:'',
    password:''
  };

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  onLogin(){
    this.authService.login(this.loginRequest);
  }

  onRegister(){
    this.router.navigate(['/auth/signin']);
  }

}
